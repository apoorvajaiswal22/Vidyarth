export function resubmitApplication(application) {
  if (application.deficiencyStatus !== "RAISED") {
    return {
      success: false,
      message: "Application does not have any raised deficiencies"
    };
  }

  application.deficiencyStatus = "RESUBMITTED";
  application.resubmittedAt = new Date();

  return {
    success: true,
    message: "Application resubmitted successfully"
  };
}