import SupportGroups from "./SupportGroups";
import SupportGroups2 from "./SupportGroups2";

const SupportGroupsMain = () => {
  return (
    <div className="support-groups-page">

      {/* HERO */}

      <section className="support-hero">
        <span className="support-hero-label">
          SOCIAL SUPPORT
        </span>

        <h1>
          You don't have to navigate everything alone.
        </h1>

        <p className="support-hero-description">
          Support groups and community spaces bring people together
          around shared experiences. They can provide a place to
          listen, talk, learn from others, and feel less isolated.
        </p>

        <div className="support-hero-note">
          <span>🤝</span>

          <p>
            You don't have to share anything before you're ready.
            Sometimes simply listening to people who understand
            can help.
          </p>
        </div>
      </section>


      {/* WHAT TO EXPECT */}

      <section className="support-expect-section">
        <div className="support-section-heading">
          <div>
            <h2>What happens in a support space?</h2>

            <p>
              Every community is different, but many support
              spaces are built around three simple ideas.
            </p>
          </div>
        </div>

        <div className="support-expect-grid">
          <div className="support-expect-card">
            <div className="support-expect-icon">👂</div>

            <h3>Listen</h3>

            <p>
              Hear from people who may have faced experiences,
              emotions, or challenges similar to your own.
            </p>
          </div>

          <div className="support-expect-card">
            <div className="support-expect-icon">💬</div>

            <h3>Share</h3>

            <p>
              Talk about your experience when you feel comfortable.
              Participation does not always mean speaking.
            </p>
          </div>

          <div className="support-expect-card">
            <div className="support-expect-icon">🌱</div>

            <h3>Connect</h3>

            <p>
              Discover community, perspectives, and resources that
              may help you feel less alone in what you're experiencing.
            </p>
          </div>
        </div>
      </section>


      {/* SUPPORT VS THERAPY */}

      <section className="support-info-banner">
        <div className="support-info-icon">
          💡
        </div>

        <div>
          <h3>
            Support groups are not the same as therapy
          </h3>

          <p>
            Peer and community spaces can provide connection and
            emotional support, but they do not replace diagnosis,
            psychotherapy, medication, or other professional mental
            health care when those are needed.
          </p>
        </div>
      </section>


      {/* SUPPORT GROUP DIRECTORIES */}

      <SupportGroups />


      {/* BROADER SUPPORT */}

      <SupportGroups2 />


      {/* BEFORE JOINING */}

      <section className="support-before-section">
        <div className="support-section-heading">
          <div>
            <h2>Before joining a space</h2>

            <p>
              A few things are worth checking before participating
              in any external community or support group.
            </p>
          </div>
        </div>

        <div className="support-check-list">
          <div className="support-check-item">
            <span>✓</span>

            <p>
              Check whether the group is peer-led,
              professionally facilitated, or informal.
            </p>
          </div>

          <div className="support-check-item">
            <span>✓</span>

            <p>
              Check whether the group meets online,
              offline, or in a hybrid format.
            </p>
          </div>

          <div className="support-check-item">
            <span>✓</span>

            <p>
              Read its privacy, moderation, participation,
              and community guidelines before joining.
            </p>
          </div>

          <div className="support-check-item">
            <span>✓</span>

            <p>
              Share only as much personal information as
              you feel comfortable sharing.
            </p>
          </div>

          <div className="support-check-item">
            <span>✓</span>

            <p>
              Check current schedules, fees, eligibility,
              and availability on the provider's website.
            </p>
          </div>

          <div className="support-check-item">
            <span>✓</span>

            <p>
              Advice from other members should not be treated
              as a medical diagnosis or treatment plan.
            </p>
          </div>
        </div>
      </section>


      {/* DISCLAIMER */}

      <div className="support-disclaimer">
        <span>ℹ️</span>

        <p>
          Manora does not operate or supervise the external groups
          and organisations listed here. Availability, schedules,
          eligibility, fees, and services can change. Always review
          the provider's current information before participating.
        </p>
      </div>

    </div>
  );
};

export default SupportGroupsMain;