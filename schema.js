const Joi = require("joi");

module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title:       Joi.string().required(),
    description: Joi.string().required(),
    location:    Joi.string().required(),
    country:     Joi.string().required(),
    price:       Joi.number().min(0).required(),
    image: Joi.string()
      .uri()                        // validate URL format
      .allow("", null)             // allow empty or null
      .optional()
  })
  .required(),                     // listing object must be present
})
.required();      


module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number()
      .min(1)
      .max(5)
      .required(),
    comment: Joi.string()
      .required(),
  })
  .required(),    // ← invoke required()
})
.required();     // ← and probably require the top‐level object too