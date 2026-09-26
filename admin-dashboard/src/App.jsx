import { useEffect, useState } from "react";
import "./App.css";

import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function App() {
  // ==============================
  // DASHBOARD STATES
  // ==============================

  const [analytics, setAnalytics] = useState(null);
  const [ranking, setRanking] = useState(null);
  const [loading, setLoading] = useState(true);

  // ==============================
  // SELECTION MANAGEMENT STATES
  // ==============================

  const [selectedApplication, setSelectedApplication] =
    useState(null);

  const [decision, setDecision] =
    useState("RECOMMENDED");

  const [reason, setReason] =
    useState("");

  const [auditHistory, setAuditHistory] =
    useState([]);

  const [decisionLoading, setDecisionLoading] =
    useState(false);

  // ==============================
  // LOAD DASHBOARD
  // ==============================

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const [analyticsResponse, rankingResponse] =
        await Promise.all([
          fetch(
            "http://localhost:5000/api/admin/analytics/summary"
          ),

          fetch(
            "http://localhost:5000/api/admin/applications/SCH001/ranked"
          ),
        ]);

      if (
        !analyticsResponse.ok ||
        !rankingResponse.ok
      ) {
        throw new Error(
          "Failed to load dashboard data"
        );
      }

      const analyticsData =
        await analyticsResponse.json();

      const rankingData =
        await rankingResponse.json();

      setAnalytics(analyticsData);
      setRanking(rankingData);

    } catch (error) {
      console.error(
        "Dashboard error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // LOAD AUDIT HISTORY
  // ==============================

  const loadAuditHistory = async (
    applicationId
  ) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/applications/${applicationId}/selection-audit`
      );

      if (!response.ok) {
        throw new Error(
          "Failed to load audit history"
        );
      }

      const data = await response.json();

      setAuditHistory(
        data.history || []
      );

    } catch (error) {
      console.error(
        "Audit history error:",
        error
      );

      setAuditHistory([]);
    }
  };

  // ==============================
  // REFRESH RANKING
  // ==============================

  const refreshRanking = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/admin/applications/SCH001/ranked"
      );

      if (!response.ok) {
        throw new Error(
          "Failed to refresh ranking"
        );
      }

      const data = await response.json();

      setRanking(data);

      /*
       * If an applicant is currently selected
       * in Selection Management, update its
       * information from the refreshed ranking.
       */
      if (selectedApplication) {
        const updatedApplication =
          data.applications.find(
            (application) =>
              application.applicationId ===
              selectedApplication.applicationId
          );

        if (updatedApplication) {
          setSelectedApplication(
            (previous) => ({
              ...previous,
              ...updatedApplication,
            })
          );
        }
      }

    } catch (error) {
      console.error(
        "Ranking refresh error:",
        error
      );
    }
  };

  // ==============================
  // SELECT APPLICANT
  // ==============================

  const handleSelectApplicant = async (
    application
  ) => {
    /*
     * Store the selected applicant.
     */
    setSelectedApplication(application);

    /*
     * Set the dropdown to the applicant's
     * current status.
     */
    setDecision(
      application.selectionStatus ||
        "RECOMMENDED"
    );

    /*
     * Clear previous reason.
     */
    setReason("");

    /*
     * Load audit history.
     */
    await loadAuditHistory(
      application.applicationId
    );
  };

  // ==============================
  // UPDATE SELECTION DECISION
  // ==============================

  const handleDecisionUpdate = async () => {
    if (!selectedApplication) {
      alert(
        "Please select an applicant first."
      );

      return;
    }

    if (!decision) {
      alert(
        "Please select a decision."
      );

      return;
    }

    setDecisionLoading(true);

    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/applications/${selectedApplication.applicationId}/selection-decision`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            decision: decision,
            reason: reason,
            decidedBy: "ADMIN",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Decision update failed"
        );
      }

      /*
       * IMPORTANT:
       * Immediately update the selected
       * applicant's status in the UI.
       *
       * This prevents the dashboard from
       * temporarily showing the old status.
       */
      setSelectedApplication(
        (previous) => ({
          ...previous,

          selectionStatus:
            data.application
              .selectionStatus,

          meritScore:
            data.application
              .meritScore,

          rank:
            data.application.rank,
        })
      );

      /*
       * Refresh ranking.
       *
       * The updated rankingController
       * preserves WAITLISTED and REJECTED
       * administrative decisions.
       */
      await refreshRanking();

      /*
       * Reload audit history so the newest
       * decision immediately appears.
       */
      await loadAuditHistory(
        selectedApplication.applicationId
      );

      /*
       * Keep dropdown synchronized.
       */
      setDecision(
        data.application.selectionStatus
      );

      /*
       * Clear reason after successful update.
       */
      setReason("");

      alert(
        "Selection decision updated successfully"
      );

    } catch (error) {
      console.error(
        "Selection decision error:",
        error
      );

      alert(error.message);

    } finally {
      setDecisionLoading(false);
    }
  };

  // ==============================
  // LOADING SCREEN
  // ==============================

  if (loading) {
    return (
      <div className="dashboard">
        <h2>Loading dashboard...</h2>
      </div>
    );
  }

  // ==============================
  // ERROR SCREEN
  // ==============================

  if (!analytics || !ranking) {
    return (
      <div className="dashboard">
        <h2>
          Unable to load dashboard data.
        </h2>

        <button
          onClick={loadDashboard}
        >
          Retry
        </button>
      </div>
    );
  }

  // ==============================
  // APPLICATIONS BY STATE
  // ==============================

  const stateData =
    analytics.applicationsByState.map(
      (item) => ({
        state: item._id,
        applications: item.count,
      })
    );

  // ==============================
  // STATUS DATA
  // ==============================

  const statusData = [
    {
      name: "Recommended",
      value:
        analytics.overview.recommended,
    },

    {
      name: "Waitlisted",
      value:
        analytics.overview.waitlisted,
    },

    {
      name: "Duplicate Flags",
      value:
        analytics.overview.duplicateFlags,
    },
  ];

  // ==============================
  // DROP-OFF DATA
  // ==============================

  const dropOffData = [
    {
      stage: "Submitted → Verified",

      dropOff:
        analytics.dropOffRates
          .submittedToVerified,
    },

    {
      stage: "Verified → Eligible",

      dropOff:
        analytics.dropOffRates
          .verifiedToEligible,
    },

    {
      stage: "Eligible → Recommended",

      dropOff:
        analytics.dropOffRates
          .eligibleToRecommended,
    },
  ];

  // ==============================
  // UI
  // ==============================

  return (
    <div className="dashboard">

      {/* =================================
          HEADER
      ================================= */}

      <header className="header">

        <div>
          <h1>Vidyarth</h1>

          <p>
            Admin Selection & Analytics
            Dashboard
          </p>
        </div>

        <div className="scheme">
          Scheme:{" "}
          <strong>
            {ranking.schemeName}
          </strong>
        </div>

      </header>


      {/* =================================
          OVERVIEW CARDS
      ================================= */}

      <section className="cards">

        <div className="card">
          <h3>Total Applications</h3>

          <p>
            {analytics.overview.totalApplications}
          </p>
        </div>


        <div className="card">
          <h3>Verified</h3>

          <p>
            {analytics.overview.verified}
          </p>
        </div>


        <div className="card">
          <h3>Eligible</h3>

          <p>
            {analytics.overview.eligible}
          </p>
        </div>


        <div className="card">
          <h3>Recommended</h3>

          <p>
            {analytics.overview.recommended}
          </p>
        </div>


        <div className="card">
          <h3>Waitlisted</h3>

          <p>
            {analytics.overview.waitlisted}
          </p>
        </div>


        <div className="card">
          <h3>Duplicate Flags</h3>

          <p>
            {analytics.overview.duplicateFlags}
          </p>
        </div>

      </section>


      {/* =================================
          CHARTS
      ================================= */}

      <section className="charts">

        {/* APPLICATIONS BY STATE */}

        <div className="chart-box">

          <h2>
            Applications by State
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <BarChart
              data={stateData}
            >

              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="state"
              />

              <YAxis
                allowDecimals={false}
              />

              <Tooltip />

              <Legend />

              <Bar
                dataKey="applications"
                name="Applications"
                fill="#6366f1"
                radius={[
                  8,
                  8,
                  0,
                  0,
                ]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>


        {/* APPLICATION STATUS */}

        <div className="chart-box">

          <h2>
            Application Status
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <PieChart>

              <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={105}
                innerRadius={45}
                paddingAngle={3}
                label
              >

                {statusData.map(
                  (entry, index) => {

                    const colors = [
                      "#22c55e",
                      "#f59e0b",
                      "#ef4444",
                    ];

                    return (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          colors[index]
                        }
                      />
                    );
                  }
                )}

              </Pie>

              <Tooltip />

              <Legend />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </section>


      {/* =================================
          DROP-OFF RATE
      ================================= */}

      <section className="chart-box full-width">

        <h2>
          Stage Drop-off Rate
        </h2>

        <ResponsiveContainer
          width="100%"
          height={300}
        >

          <BarChart
            data={dropOffData}
          >

            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="stage"
            />

            <YAxis unit="%" />

            <Tooltip />

            <Bar
              dataKey="dropOff"
              name="Drop-off %"
            />

          </BarChart>

        </ResponsiveContainer>

      </section>


      {/* =================================
          PROCESSING TIME
      ================================= */}

      <section className="processing">

        <h2>
          Average Processing Time
        </h2>

        <div className="processing-value">
          {
            analytics
              .averageProcessingTime
              .hours
          }{" "}
          hours
        </div>

        <p>
          Average time from application
          submission to verification.
        </p>

      </section>


      {/* =================================
          MERIT RANKING
      ================================= */}

      <section className="ranking">

        <h2>
          Merit Ranking
        </h2>

        <div className="table-container">

          <table>

            <thead>

              <tr>

                <th>Rank</th>

                <th>
                  Application ID
                </th>

                <th>Name</th>

                <th>State</th>

                <th>Category</th>

                <th>Marks</th>

                <th>Income</th>

                <th>
                  Merit Score
                </th>

                <th>Status</th>

                <th>Action</th>

              </tr>

            </thead>


            <tbody>

              {ranking.applications.map(
                (application) => (

                  <tr
                    key={
                      application.applicationId
                    }
                  >

                    <td>
                      {application.rank}
                    </td>


                    <td>
                      {
                        application.applicationId
                      }
                    </td>


                    <td>
                      {application.name}
                    </td>


                    <td>
                      {application.state}
                    </td>


                    <td>
                      {application.category}
                    </td>


                    <td>
                      {application.marks}
                    </td>


                    <td>
                      ₹
                      {application.income.toLocaleString()}
                    </td>


                    <td>
                      <strong>
                        {
                          application.meritScore
                        }
                      </strong>
                    </td>


                    <td>

                      <span
                        className={
                          application.selectionStatus ===
                          "RECOMMENDED"
                            ? "recommended"
                            : application.selectionStatus ===
                              "WAITLISTED"
                            ? "waitlisted"
                            : "rejected"
                        }
                      >
                        {
                          application.selectionStatus
                        }
                      </span>

                    </td>


                    <td>

                      <button
                        className="manage-button"
                        onClick={() =>
                          handleSelectApplicant(
                            application
                          )
                        }
                      >
                        Manage
                      </button>

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      </section>


      {/* =================================
          SELECTION MANAGEMENT
      ================================= */}

      {selectedApplication && (

        <section className="selection-management">

          <h2>
            Selection Management
          </h2>


          {/* APPLICANT INFORMATION */}

          <div className="selection-info">

            <div>
              <strong>
                Applicant:
              </strong>

              <span>
                {
                  selectedApplication.name
                }
              </span>
            </div>


            <div>
              <strong>
                Application ID:
              </strong>

              <span>
                {
                  selectedApplication.applicationId
                }
              </span>
            </div>


            <div>
              <strong>
                Rank:
              </strong>

              <span>
                {
                  selectedApplication.rank
                }
              </span>
            </div>


            <div>
              <strong>
                Merit Score:
              </strong>

              <span>
                {
                  selectedApplication.meritScore
                }
              </span>
            </div>


            <div>
              <strong>
                Current Status:
              </strong>

              <span
                className={
                  selectedApplication.selectionStatus ===
                  "RECOMMENDED"
                    ? "recommended"
                    : selectedApplication.selectionStatus ===
                      "WAITLISTED"
                    ? "waitlisted"
                    : "rejected"
                }
              >
                {
                  selectedApplication.selectionStatus
                }
              </span>
            </div>

          </div>


          {/* DECISION FORM */}

          <div className="decision-form">

            <label>
              Selection Decision
            </label>

            <select
              value={decision}
              onChange={(event) =>
                setDecision(
                  event.target.value
                )
              }
            >

              <option value="RECOMMENDED">
                RECOMMENDED
              </option>

              <option value="WAITLISTED">
                WAITLISTED
              </option>

              <option value="REJECTED">
                REJECTED
              </option>

            </select>


            <label>
              Reason
            </label>

            <textarea
              value={reason}
              onChange={(event) =>
                setReason(
                  event.target.value
                )
              }
              placeholder="Enter reason for this selection decision..."
              rows={4}
            />


            <button
              onClick={
                handleDecisionUpdate
              }
              disabled={decisionLoading}
            >

              {decisionLoading
                ? "Updating..."
                : "Update Decision"}

            </button>

          </div>


          {/* =================================
              AUDIT HISTORY
          ================================= */}

          <div className="audit-history">

            <h3>
              Selection Audit History
            </h3>


            {auditHistory.length === 0 ? (

              <p>
                No selection decisions
                recorded yet.
              </p>

            ) : (

              <div className="table-container">

                <table>

                  <thead>

                    <tr>

                      <th>
                        Previous
                      </th>

                      <th>
                        New Decision
                      </th>

                      <th>
                        Reason
                      </th>

                      <th>
                        Decided By
                      </th>

                      <th>
                        Date & Time
                      </th>

                    </tr>

                  </thead>


                  <tbody>

                    {auditHistory.map(
                      (audit) => (

                        <tr
                          key={
                            audit._id
                          }
                        >

                          <td>
                            {
                              audit.previousStatus
                            }
                          </td>


                          <td>

                            <span
                              className={
                                audit.newStatus ===
                                "RECOMMENDED"
                                  ? "recommended"
                                  : audit.newStatus ===
                                    "WAITLISTED"
                                  ? "waitlisted"
                                  : "rejected"
                              }
                            >
                              {
                                audit.newStatus
                              }
                            </span>

                          </td>


                          <td>
                            {
                              audit.reason ||
                              "—"
                            }
                          </td>


                          <td>
                            {
                              audit.decidedBy
                            }
                          </td>


                          <td>
                            {audit.decidedAt
                              ? new Date(
                                  audit.decidedAt
                                ).toLocaleString()
                              : "—"}
                          </td>

                        </tr>

                      )
                    )}

                  </tbody>

                </table>

              </div>

            )}

          </div>

        </section>

      )}

    </div>
  );
}

export default App;