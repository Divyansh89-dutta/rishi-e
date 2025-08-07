import nodemailer from "nodemailer";

export const sendOrderConfirmationEmail = async (to, order) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Shopify Clone" <${process.env.EMAIL_USER}>`,
    to,
    subject: "🧾 Order Confirmation - Shopify Clone",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>✅ Order Placed Successfully!</h2>
        <p>Thank you for shopping with us, <strong>${order.shippingAddress.fullName}</strong>.</p>
        <p><strong>Order ID:</strong> ${order._id}</p>
        <p><strong>Total Amount:</strong> ₹${order.totalAmount.toLocaleString("en-IN")}</p>

        <h3>Shipping To:</h3>
        <p>
          ${order.shippingAddress.address},<br />
          ${order.shippingAddress.city}, ${order.shippingAddress.postalCode},<br />
          ${order.shippingAddress.country}
        </p>

        <p>We’ll notify you once the item is shipped 🚚</p>
        <hr/>
        <p style="font-size: 12px; color: gray;">This is an automated message from Shopify Clone</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};
