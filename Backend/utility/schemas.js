const { z } = require('zod');

// kidneys schema
const kidneysSchema = z.object({
    healthy: z.boolean()
});

// Heart schema
const heartSchema = z.object({
    healthy: z.boolean()
});

// Bones schema
const bonesSchema = z.object({
    current: z.boolean(),
    brokenPast: z.number(),
    plastered: z.number()
});

// User schema, the only one which we are using
const userSchema = z.object({
    userName: z.string(),
    bhakti: z.boolean(),
    kidneys: z.array(kidneysSchema),
    heart: heartSchema,
    Bones: z.array(bonesSchema)
});

const userNamesSchema = z.object({
    userName: z.string(),
    password: z.string().min(8),
    email: z.string().email()
});

module.exports = {
    kidneysSchema,
    heartSchema,
    bonesSchema,
    userSchema,
    userNamesSchema
}