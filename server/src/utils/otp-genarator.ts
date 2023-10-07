function generateOTP(): number {
  // Define a list of digits excluding zero
  const validDigits: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  // Generate a 6-digit OTP by randomly selecting digits from validDigits
  const otp: string = Array.from({ length: 6 }, () =>
    String(validDigits[Math.floor(Math.random() * validDigits.length)])
  ).join("");

  return parseInt(otp);
}

export { generateOTP };

// Generate and log an OTP
