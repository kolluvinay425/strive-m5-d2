import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.MY_API_KEY);

export const sendMail = async (recepient) => {
  const message = {
    to: recepient,
    from: "lonelyvinay76@gmail.com",
    subject: "The new blog is posted checkout",
    text: "Email sent",
    html: "<strong>The new blog is posted checkout<strong/>",
  };
  await sgMail.send(message);
};
