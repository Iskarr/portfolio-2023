import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.FROM_EMAIL;

export async function POST(req, res) {
  const { email, subject, message } = await req.json();
  console.log(email, subject, message);
  await resend.sendEmail({
    from: "Austin <email@electrifiedcoding.com>",
    to: [fromEmail, email],
    subject: subject,
    react: (
      <>
        <p>
          We wanted to acknowledge that we have received your recent message
          with the subject line {subject}.
        </p>
        <p>
          Please note that this is a no-reply email address, and we will not be
          responding directly from this email. However, I want to assure you
          that your message is important to us, and we are committed to
          addressing your inquiry as promptly as possible. Our team is currently
          reviewing your message, and we will do our best to provide a
          comprehensive response within the next 2 business days. Your patience
          is greatly appreciated as we work to ensure that your concerns or
          questions are thoroughly addressed.
        </p>
        <p>
          If you have any additional information or details to add to your
          message, please feel free to reach out to us via
          electrifiedcoding.com, and we will incorporate it into our response.
          Thank you for reaching out to us. We value your input and look forward
          to assisting you with your inquiry.
        </p>
        <p> Your message to us: {message}</p>
      </>
    ),
  });
  return NextResponse.json({
    status: "ok",
  });
}
