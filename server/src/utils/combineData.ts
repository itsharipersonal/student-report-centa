// combinedData.ts
interface CombinedData {
  otp: number; // OTP (assuming it's a string)
  otpGeneratedAt: number; // Timestamp when OTP was generated
  user: {
    rollno: number; // User ID (assuming it's a string)
    studentname: string; // User email (assuming it's a string)
    email: string;
  };
}

export { CombinedData };
