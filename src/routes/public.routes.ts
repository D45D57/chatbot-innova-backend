import { Router } from 'express';
import { getFAQsPublicas, getChatInit } from '../controllers/public.controller';
import { addPublicConsultationMessage, createPublicConsultation, updatePublicConsultationContact } from '../controllers/consultation.controller';
import { validate } from '../middlewares/validator.middleware';
import { addConsultationMessageSchema, consultationParamsSchema, createConsultationSchema, updatePublicContactSchema } from '../schema/consultation.schema';

const router = Router();

// Endpoint público: para obtener FAQs públicas
router.get('/chatbot/:slug/faqs', getFAQsPublicas);
router.post('/chatbot/:slug/consultations', validate(createConsultationSchema), createPublicConsultation);
router.post('/chatbot/:slug/consultations/:id/messages', validate(consultationParamsSchema, 'params'), validate(addConsultationMessageSchema), addPublicConsultationMessage);
router.patch('/chatbot/:slug/consultations/:id/contact', validate(consultationParamsSchema, 'params'), validate(updatePublicContactSchema), updatePublicConsultationContact);

// Endpoint público: para inicializar el chat (saludo y botones)
router.get('/chatbot/:slug/init', getChatInit);

export default router;
