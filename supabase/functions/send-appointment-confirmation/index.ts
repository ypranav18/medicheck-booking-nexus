
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface AppointmentData {
  doctorName: string;
  doctorSpecialty: string;
  date: string;
  time: string;
  patientEmail: string;
  patientName: string;
  reason: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { doctorName, doctorSpecialty, date, time, patientEmail, patientName, reason }: AppointmentData = await req.json();

    const data = await resend.emails.send({
      from: "Appointment Confirmation <onboarding@resend.dev>",
      to: patientEmail,
      subject: "Your Appointment Has Been Confirmed",
      html: `
        <h1>Appointment Confirmation</h1>
        <p>Dear ${patientName},</p>
        <p>Your appointment has been successfully scheduled:</p>
        <ul>
          <li><strong>Doctor:</strong> ${doctorName}</li>
          <li><strong>Specialty:</strong> ${doctorSpecialty}</li>
          <li><strong>Date:</strong> ${date}</li>
          <li><strong>Time:</strong> ${time}</li>
          <li><strong>Reason:</strong> ${reason}</li>
        </ul>
        <p>If you need to reschedule or cancel your appointment, please contact us.</p>
        <p>Best regards,<br>Medical Clinic Team</p>
      `
    });

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
