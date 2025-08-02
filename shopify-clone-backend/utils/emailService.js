import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // your Gmail ID
    pass: process.env.EMAIL_PASS, // app password (not your Gmail password!)
  },
});

export const sendOrderConfirmation = async (toEmail, order) => {
  const mailOptions = {
    from: `"Shopify Clone" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: `Order Confirmation - ${order._id}`,
    html: `
      <h2>Thanks for your order!</h2>
      <p>Order ID: <strong>${order._id}</strong></p>
      <p>Amount: <strong>₹${order.totalPrice}</strong></p>
      <p>We will notify you when your order ships.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};
