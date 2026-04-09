import Message from '../models/Message.js';
import { body, validationResult } from 'express-validator';
import { sendEmail } from '../utils/sendEmail.js';

export const submitMessageValidation = [
  body('name').trim().notEmpty(),
  body('email').isEmail().normalizeEmail(),
  body('subject').trim().notEmpty(),
  body('message').trim().notEmpty()
];

export const submitMessage = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: errors.array()[0].msg });
    }

    const { name, email, subject, message } = req.body;

    const newMessage = await Message.create({ name, email, subject, message });

    await sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact Enquiry: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    });

    await sendEmail({
      to: email,
      subject: 'Thank you for contacting Isioma & Co.',
      html: `
        <h2>Thank you for reaching out!</h2>
        <p>Dear ${name},</p>
        <p>We have received your message and will get back to you shortly.</p>
        <p>Best regards,<br/>Isioma & Co.</p>
      `
    });

    res.status(201).json({ success: true, data: newMessage, message: 'Message sent successfully' });
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json({ success: true, data: messages });
  } catch (error) {
    next(error);
  }
};

export const markAsRead = async (req, res, next) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }

    res.json({ success: true, data: message });
  } catch (error) {
    next(error);
  }
};

export const deleteMessage = async (req, res, next) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }
    res.json({ success: true, message: 'Message deleted' });
  } catch (error) {
    next(error);
  }
};