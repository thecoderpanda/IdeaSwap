/* eslint-disable no-undef */

const express = require("express");
const router = express.Router();
const passport = require("passport");

// Load Validation
const validateProfileInput = require("../../validation/profile");
const validateExperienceInput = require("../../validation/experience");
const validateEducationInput = require("../../validation/education");

// Load Profile Model
const Profile = require("../../models/Profile");
// Load User Model
const User = require("../../models/User");

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Profile Works" }));

// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    console.log(req.params);
    Profile.findOne({ user: req.query.user_id })
      .populate("user", ["name", "avatar"])
      .then(profile => {
        console.log(req.query.user_id)
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
router.get("/all", (req, res) => {
  const errors = {};

  Profile.find()
    .populate("user", ["name", "avatar"])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = "There are no profiles";
        return res.status(404).json(errors);
      }

      res.json(profiles);
    })
    .catch(err => res.status(404).json({ profile: "There are no profiles" }));
});

// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public

router.get("/handle/:handle", (req, res) => {
  const errors = {};

  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID 
// @access  Public

// router.get("/user/:user_id", (req, res) => {
//   const errors = {};
//   console.log("user id =" + req.params.user_id);

//   Profile.findOne({ user: req.params.user_id })
//     .populate("user", ["name", "avatar"])
//     .then(profile => {
//       if (!profile) {
//         errors.noprofile = "There is no profile for this user";
//         res.status(404).json(errors);
//       }

//       res.json(profile);
//     })
//     .catch(err =>
//       res.status(404).json({ profile: "There is no profile for this user" })
//     );
// });

// @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // console.log(req.body.social.youtube);
    const { errors, isValid } = validateProfileInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      errors.message = "Fields not valid !";
      return res.status(200).json(errors);
    }

    // Get fields
    const profileFields = {};
    profileFields.user = req.body.user;
    profileFields.first_name = req.body.first_name;
    profileFields.last_name = req.body.last_name;

    // if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;
    // Skills - Spilt into array
    if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills.split(",");
    }

    // Social
    // profileFields.social = {};
    // if (req.body.social.youtube) profileFields.social.youtube = req.body.social.youtube;
    // if (req.body.social.twitter) profileFields.social.twitter = req.body.socialtwitter;
    // if (req.body.social.facebook) profileFields.social.facebook = req.body.social.facebook;
    // if (req.body.social.linkedin) profileFields.social.linkedin = req.body.social.linkedin;
    // if (req.body.social.instagram) profileFields.social.instagram = req.body.social.instagram;

    Profile.findOne({ user: req.body.user_id }).then(profile => {
      if (profile) {
        // Update
        Profile.findOneAndUpdate(
          { user: req.body.user_id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        // Create

        // Check if handle exists
        // Profile.findOne({ handle: profileFields.handle }).then(profile => {
        //   if (profile) {
        //     errors.handle = "That handle already exists";
        //     res.status(200).json(errors);
        //   }

        // Save Profile
        new Profile(profileFields).save().then(profile => res.json(profile));

      }
    });
  }
);

// @route   POST api/profile/experience
// @desc    Add experience to profile
// @access  Private
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };

      // Add to exp array
      profile.experience.unshift(newExp);

      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route   POST api/profile/education
// @desc    Add education to profile
// @access  Private
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        fieldofstudy: req.body.fieldofstudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };

      // Add to exp array
      profile.education.unshift(newEdu);

      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private
router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // Get remove index
        const removeIndex = profile.experience
          .map(item => item.id)
          .indexOf(req.params.exp_id);

        // Splice out of array
        profile.experience.splice(removeIndex, 1);

        // Save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete education from profile
// @access  Private
router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // Get remove index
        const removeIndex = profile.education
          .map(item => item.id)
          .indexOf(req.params.edu_id);

        // Splice out of array
        profile.education.splice(removeIndex, 1);

        // Save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

// Patch request for updating profile

router.patch("/update",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.body.bio) {
      Profile.findOneAndUpdate({ user: req.body.user_id }, { bio: req.body.bio })
        .then(console.log("bio updated"))
        .catch(err => res.send(err));
    }
    if (req.body.last_name) {
      Profile.findOne({ user: req.body.user_id })
        .then(profile => {
          User.findOneAndUpdate({ _id: profile.user }, {
            last_name: req.body.last_name
          }).then(console.log("last_name updated"))
            .catch(err => res.send(err));
        })
        .catch(err => console.log(err))
    }
    if (req.body.first_name) {
      Profile.findOne({ user: req.body.user_id })
        .then(profile => {
          User.findOneAndUpdate({ _id: profile.user }, {
            first_name: req.body.first_name,
          }).then(user => res.json({ success: true }))
            .catch(err => res.send(err));
        })
        .catch(err => console.log(err))
    }

    if(req.body.wallet_address) {
      Profile.findOneAndUpdate({ user: req.body.user_id }, { wallet_address: req.body.wallet_address })
        .then(console.log("wallet_address updated"))
        .catch(err => res.send(err));
    }
    // res.json({ error: "Empty fields !" })
  })

module.exports = router;
