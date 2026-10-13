export function validateInquiry(
  data: Record<string, string | boolean>,
): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const name of [
    "name",
    "email",
    "event",
    "date",
    "location",
    "country",
    "budget",
    "services",
    "style",
    "details",
  ]) {
    const value = data[name];
    if (typeof value !== "string" || !value.trim())
      errors[name] = "Please complete this field.";
    else if (
      value.length > (name === "details" ? 2000 : name === "email" ? 254 : 120)
    )
      errors[name] = "Please shorten this field.";
  }
  if (
    typeof data.email === "string" &&
    data.email &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
  )
    errors.email = "Enter a valid email address.";
  if (data.date && !/^\d{4}-\d{2}-\d{2}$/.test(String(data.date)))
    errors.date = "Enter a valid date.";
  if (!data.consent)
    errors.consent = "Please acknowledge the demo privacy notice.";
  return errors;
}
