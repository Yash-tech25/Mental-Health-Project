import {
  useState
} from "react";

import emailjs from "emailjs-com";

import "font-awesome/css/font-awesome.min.css";


const ContactUs = () => {

  // =========================================================
  // EMAILJS CONFIG
  // =========================================================

  const emailJsServiceId =
    import.meta.env.VITE_EMAILJS_SERVICE_ID;

  const emailJsTemplateId =
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

  const emailJsPublicKey =
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY;


  // =========================================================
  // FORM STATE
  // =========================================================

  const [
    formData,
    setFormData
  ] = useState({

    name:
      "",

    email:
      "",

    message:
      "",

  });


  const [
    sending,
    setSending
  ] = useState(
    false
  );


  const [
    status,
    setStatus
  ] = useState({

    type:
      "",

    message:
      "",

  });


  // =========================================================
  // HANDLE INPUT CHANGE
  // =========================================================

  const handleChange = (
    event
  ) => {

    const {
      name,
      value
    } = event.target;


    setFormData(
      (previousData) => ({

        ...previousData,

        [name]:
          value,

      })
    );


    if (
      status.message
    ) {

      setStatus({

        type:
          "",

        message:
          "",

      });

    }

  };


  // =========================================================
  // SEND EMAIL
  // =========================================================

  const handleSubmit =
    async (
      event
    ) => {

      event.preventDefault();


      if (
        sending
      ) {

        return;

      }


      if (
        !emailJsServiceId ||
        !emailJsTemplateId ||
        !emailJsPublicKey
      ) {

        console.error(
          "EmailJS environment variables are missing."
        );


        setStatus({

          type:
            "error",

          message:
            "Contact form configuration is unavailable right now.",

        });


        return;

      }


      setSending(
        true
      );


      setStatus({

        type:
          "",

        message:
          "",

      });


      try {

        await emailjs.sendForm(

          emailJsServiceId,

          emailJsTemplateId,

          event.currentTarget,

          emailJsPublicKey

        );


        setStatus({

          type:
            "success",

          message:
            "Your message has been sent successfully. We'll get back to you soon.",

        });


        setFormData({

          name:
            "",

          email:
            "",

          message:
            "",

        });

      } catch (error) {

        console.error(
          "Email sending failed:",
          error
        );


        setStatus({

          type:
            "error",

          message:
            "We couldn't send your message right now. Please try again.",

        });

      } finally {

        setSending(
          false
        );

      }

    };


  return (

    <div className="contact-page">

      <div className="contact-container">


        {/* ===================================================
            CONTACT INFORMATION
        =================================================== */}

        <div className="contact-info">

          <div className="contact-heading-icon">
            🌿
          </div>


          <h2>
            Get In Touch
          </h2>


          <p className="contact-intro">

            Have a question, suggestion, or just want to reach out?
            We'd be happy to hear from you.

          </p>


          <div className="contact-details">


            {/* LOCATION */}

            <div className="contact-detail-card">

              <div className="contact-detail-icon">

                <i
                  className="fa fa-map-marker"
                  aria-hidden="true"
                />

              </div>


              <div>

                <span className="contact-detail-label">
                  Location
                </span>


                <p>
                  VIT Bhopal University
                </p>

              </div>

            </div>


            {/* PHONE */}

            <div className="contact-detail-card">

              <div className="contact-detail-icon">

                <i
                  className="fa fa-phone"
                  aria-hidden="true"
                />

              </div>


              <div>

                <span className="contact-detail-label">
                  Phone
                </span>


                <p>
                  +91 98279 XXXXX
                </p>

              </div>

            </div>


            {/* EMAIL */}

            <div className="contact-detail-card">

              <div className="contact-detail-icon">

                <i
                  className="fa fa-envelope"
                  aria-hidden="true"
                />

              </div>


              <div>

                <span className="contact-detail-label">
                  Email
                </span>


                <p>
                  manora.support@gmail.com
                </p>

              </div>

            </div>

          </div>

        </div>


        {/* ===================================================
            CONTACT FORM
        =================================================== */}

        <div className="contact-form">

          <div className="contact-form-header">

            <span>
              💬
            </span>


            <h3>
              Send Us a Message
            </h3>


            <p>
              Fill in the form below and we'll get back to you.
            </p>

          </div>


          <form
            onSubmit={
              handleSubmit
            }
          >


            {/* NAME */}

            <div className="form-group">

              <label
                htmlFor="name"
              >
                Name
              </label>


              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your name"
                value={
                  formData.name
                }
                onChange={
                  handleChange
                }
                autoComplete="name"
                required
              />

            </div>


            {/* EMAIL */}

            <div className="form-group">

              <label
                htmlFor="email"
              >
                Email
              </label>


              <input
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
                value={
                  formData.email
                }
                onChange={
                  handleChange
                }
                autoComplete="email"
                required
              />

            </div>


            {/* MESSAGE */}

            <div className="form-group">

              <label
                htmlFor="message"
              >
                Message
              </label>


              <textarea
                id="message"
                name="message"
                rows="6"
                placeholder="Write your message here..."
                value={
                  formData.message
                }
                onChange={
                  handleChange
                }
                maxLength="3000"
                required
              />

            </div>


            {/* STATUS */}

            {status.message && (

              <div
                className={
                  `contact-status ${status.type}`
                }
                role="status"
              >

                <span>

                  {status.type ===
                  "success"
                    ? "✓"
                    : "!"}

                </span>


                <span>
                  {status.message}
                </span>

              </div>

            )}


            {/* SUBMIT */}

            <button
              type="submit"
              className="contact-submit-button"
              disabled={
                sending
              }
            >

              {sending ? (

                <>

                  <span className="contact-spinner" />

                  Sending...

                </>

              ) : (

                <>

                  Send Message

                  <span className="contact-send-arrow">
                    →
                  </span>

                </>

              )}

            </button>

          </form>

        </div>

      </div>

    </div>

  );

};


export default ContactUs;