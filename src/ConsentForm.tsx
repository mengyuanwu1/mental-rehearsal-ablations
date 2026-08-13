import { useRef, useState, type FormEvent } from "react";
import { postConsent, storeConsent } from "./lib/responses";
import type { ConsentResponse } from "./types";

const consentVersion = "CF-ACYY8836 / IRB-ACYY0664 (Y01M02)";
const consentPdfUrl = `${import.meta.env.BASE_URL}consent_ablation.pdf`;

type ConsentFormProps = {
  adminMode: boolean;
  assignmentId: number;
  onBack: () => void;
  onSubmitted: (response: ConsentResponse) => void;
  participantId: string;
};

export default function ConsentForm({
  adminMode,
  assignmentId,
  onBack,
  onSubmitted,
  participantId,
}: ConsentFormProps) {
  const [acknowledged, setAcknowledged] = useState(false);
  const [startedAt] = useState(() => new Date().toISOString());
  const [postingError, setPostingError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submittingRef = useRef(false);

  async function submitConsent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!acknowledged || isSubmitting || submittingRef.current) return;

    const submittedAt = new Date().toISOString();
    const response: ConsentResponse = {
      responseId: `${participantId}:${assignmentId}:consent`,
      participantId,
      assignmentId,
      consentVersion,
      consentGiven: true,
      startedAt,
      submittedAt,
      elapsedMs: Date.now() - new Date(startedAt).getTime(),
      userAgent: navigator.userAgent,
    };

    submittingRef.current = true;
    setIsSubmitting(true);
    storeConsent(response);

    try {
      if (!adminMode) {
        await postConsent(response);
      }
      setPostingError("");
    } catch {
      setPostingError("Your consent was saved on this device, but the network post failed.");
    } finally {
      submittingRef.current = false;
      setIsSubmitting(false);
      onSubmitted(response);
    }
  }

  return (
    <main className="app-shell consent-shell">
      <header className="study-header">
        <div>
          <p className="overline">Research consent</p>
          <h1>Please review the consent form.</h1>
        </div>
        <div className="progress-block" aria-label="Consent step">
          <span>Consent</span>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: "10%" }} />
          </div>
        </div>
      </header>

      <form className="consent-panel" onSubmit={submitConsent}>
        <div className="consent-toolbar">
          <div>
            <strong>Columbia University Consent Form</strong>
            <span>{consentVersion}</span>
          </div>
          <a className="secondary-button consent-download" href={consentPdfUrl} target="_blank" rel="noreferrer">
            Open the original PDF
          </a>
        </div>

        <article className="consent-document">
          <header className="consent-document-header">
            <p className="context-label">Protocol information</p>
            <h2>Cognitive Training for Student Sleep and Wellness</h2>
            <dl className="consent-facts">
              <div>
                <dt>Attached to protocol</dt>
                <dd>IRB-ACYY0664</dd>
              </div>
              <div>
                <dt>Principal investigator</dt>
                <dd>Xuhai &quot;Orson&quot; Xu (xx2489)</dd>
              </div>
              <div>
                <dt>Consent number</dt>
                <dd>CF-ACYY8836</dd>
              </div>
              <div>
                <dt>Participation duration</dt>
                <dd>20 minutes</dd>
              </div>
              <div>
                <dt>Anticipated subjects</dt>
                <dd>150</dd>
              </div>
            </dl>
            <p>
              <strong>Research purpose:</strong> The purpose of this research study is to evaluate different versions of
              content used in smartphone-based cognitive training and wellness programs. We will examine how participants
              perceive and rate different intervention scripts and components in terms of clarity, relevance, usefulness,
              engagement, credibility, and expected benefits.
            </p>
          </header>

          <section className="consent-section" aria-labelledby="consent-contacts">
            <h2 id="consent-contacts">Contacts</h2>
            <div className="consent-contact-card">
              <div>
                <span>Principal Investigator</span>
                <strong>Xuhai &quot;Orson&quot; Xu</strong>
              </div>
              <div>
                <span>Phone</span>
                <a href="tel:+12065199229">206-519-9229</a>
              </div>
              <div>
                <span>Email</span>
                <a href="mailto:xx2489@columbia.edu">xx2489@columbia.edu</a>
              </div>
            </div>
          </section>

          <section className="consent-section" aria-labelledby="consent-information">
            <h2 id="consent-information">Information on Research</h2>
            <h3>Introduction</h3>
            <p>
              The purpose of this form is to give you information to help you decide if you want to take part in a research
              study. This consent form includes information about:
            </p>
            <ul>
              <li>why the study is being done;</li>
              <li>the things that you will be asked to do if you are in the study;</li>
              <li>any known risks involved;</li>
              <li>any potential benefit;</li>
              <li>options, other than taking part in this study, that you have.</li>
            </ul>
            <p>
              If you have any questions about the study at any point, you are encouraged to contact the principal
              investigator (the lead researcher overseeing this project) or a member of the research team by email. You may
              reach out to the PI listed above.
            </p>
            <p>
              If you have any questions about your rights as a research subject, you can contact the Institutional Review
              Board at <a href="tel:+12123055883">212-305-5883</a> or visit the website at{" "}
              <a href="http://www.cumc.columbia.edu/dept/irb/info.html" target="_blank" rel="noreferrer">
                www.cumc.columbia.edu/dept/irb/info.html
              </a>.
            </p>
            <p>
              The purpose of this research study is described below in the &quot;What is Involved in This Study?&quot; section of
              this consent form. You are being asked to participate because you meet the study&apos;s Prolific eligibility
              criteria.
            </p>

            <h3>Why is this study being done?</h3>
            <p>
              We are conducting this study to understand how adults perceive different versions of content used in
              smartphone-based cognitive training and wellness programs.
            </p>

            <h3>What will I be asked to do if I choose to be in this study?</h3>
            <p>
              If you choose to take part in this research study, you will complete a single online study session through
              Qualtrics. You will access the study through Prolific using your own internet-enabled device. You will not be
              asked to download or use any of the study applications.
            </p>
            <p>
              You will be randomly assigned to review one or more scripts or script excerpts associated with the Equa,
              MyTime, and/or Mental Rehearsal programs. You may review a complete version of a script or a modified version
              in which selected components have been removed, changed, replaced, or presented in a different order.
            </p>
            <p>
              After reviewing each assigned script or excerpt, you will answer questions about your impressions of the
              material. These questions may ask about the script&apos;s clarity, relevance, usefulness, engagement,
              credibility, expected benefits, and perceived support for stress management, preparation, goal clarity, and
              well-being. You may also be asked to provide brief written feedback explaining your ratings.
            </p>
            <p>
              A pseudonymous Prolific Participant ID may be collected after you provide consent. This ID may be used to
              match your Qualtrics responses with your Prolific submission, prevent duplicate participation, review data
              quality, and administer compensation. Your Prolific ID will not be included in research reports or
              publications.
            </p>
            <p>
              The estimated completion time will be stated in the Prolific study listing before you decide whether to
              participate. This study does not involve downloading or using a mobile app, wearing a Fitbit, attending an
              in-person appointment, providing academic information, participating in an interview, or completing any
              longitudinal follow-up. No audio or video recording will occur.
            </p>

            <h3>Use of Data, Storage, and Future Use</h3>
            <p>
              The information you provide, including your script ratings and written feedback, may be stored for future
              research related to digital wellness, mindfulness, mental rehearsal, human-computer interaction, and
              intervention design. Study data will be stored on secure, password-protected systems approved by Columbia
              University. Your responses will be associated with a study ID, and your Prolific ID will be stored separately
              from the research dataset whenever possible.
            </p>
            <p>
              Data shared for future research will be provided without direct identifiers. You will not receive compensation
              for future academic or commercial use of data that have been de-identified.
            </p>
          </section>

          <section className="consent-section" aria-labelledby="consent-risks">
            <h2 id="consent-risks">Risks</h2>
            <h3>What are the risks of the study?</h3>
            <p>
              Potential risks include a breach of confidentiality because we may collect participants&apos; electronic
              consent records, pseudonymous Prolific Participant IDs, and IP addresses. If IP addresses are collected, they
              will be deleted before data analysis. Prolific IDs and any other identifying information will be stored
              separately from the coded research dataset. Study data will be stored on secure, institution-approved cloud
              infrastructure maintained by Columbia University (Columbia-certified AWS, System ID: 7596), and access will
              be restricted to authorized research personnel. The risk of a confidentiality breach is low.
            </p>
            <p>
              Some intervention scripts may address topics related to stress, well-being, preparation, or daily challenges.
              Reviewing these materials or answering questions about them may cause mild discomfort, boredom, or fatigue.
              Participants may stop participating at any time.
            </p>
            <p>
              There may be other risks of participating in this study that we do not currently know about. If any new risks
              are identified during the study, we will inform you so you can decide whether to continue participating.
            </p>
          </section>

          <section className="consent-section" aria-labelledby="consent-benefits">
            <h2 id="consent-benefits">Benefits</h2>
            <h3>Are there benefits to taking part in the study?</h3>
            <p>There is no expected direct benefit. Your feedback may help improve future digital wellness interventions.</p>
          </section>

          <section className="consent-section" aria-labelledby="consent-alternatives">
            <h2 id="consent-alternatives">Alternative Procedures</h2>
            <h3>What other options are there?</h3>
            <p>You may choose not to take part in this research study.</p>
          </section>

          <section className="consent-section" aria-labelledby="consent-compensation">
            <h2 id="consent-compensation">Compensation</h2>
            <h3>Will I get paid or be given anything to take part in this study?</h3>
            <p>
              You will be compensated through Prolific at a rate equivalent to approximately $12 per hour. The exact fixed
              payment amount and estimated completion time will be displayed in the Prolific study listing before you decide
              whether to participate.
            </p>
            <p>
              After completing the Qualtrics survey, you will receive a completion code or be redirected to Prolific to record
              your study completion. Payment will be issued through Prolific according to its standard payment procedures.
            </p>
          </section>

          <section className="consent-section" aria-labelledby="consent-costs">
            <h2 id="consent-costs">Additional Costs</h2>
            <h3>What are the costs?</h3>
            <p>There are no costs to you for taking part in this study.</p>
          </section>

          <section className="consent-section" aria-labelledby="consent-voluntary">
            <h2 id="consent-voluntary">Voluntary Participation</h2>
            <h3>Do I have to be in the study?</h3>
            <p>
              Participation in this study is voluntary. Refusal to participate will involve no penalty or loss of benefits to
              which you are otherwise entitled. You may discontinue participation at any time without penalty or loss of
              benefits to which you are otherwise entitled.
            </p>
            <p>
              Your decision whether or not to participate will have no impact on your employment, student status, or any
              other entitlements. If you do choose to participate, the answers given will have no impact on salary, grade, or
              employment with Columbia University Irving Medical Center (CUIMC) or New-York Presbyterian (NYP).
            </p>
          </section>

          <section className="consent-section consent-statement" aria-labelledby="consent-statement">
            <h2 id="consent-statement">Statement of Consent</h2>
            <p>
              I voluntarily consent to participate in the study. I have read this consent form, which includes information
              about the nature and the purpose of the study, as well as a description of study procedures.
            </p>
            <p>
              I have discussed the study with the investigator or study staff, have had the opportunity to ask questions and
              have received satisfactory answers. The explanation I have been given has mentioned both the possible risks
              and benefits to participating in the study and the alternatives to participation.
            </p>
            <p>
              I understand that I am free to not participate in the study or to withdraw at any time. My decision not to
              participate, or to withdraw from the study, will not affect my future care or status with this investigator.
            </p>
            <p>
              I understand that I will receive a copy of this signed and dated consent form. By signing and dating this
              consent form, I have not waived any of the legal rights that I would have if I were not a participant in the
              study.
            </p>
          </section>
        </article>

        <div className="consent-confirmation">
          <label>
            <input
              checked={acknowledged}
              disabled={isSubmitting}
              onChange={(event) => setAcknowledged(event.currentTarget.checked)}
              type="checkbox"
            />
            <span>
              <strong>I voluntarily consent to participate in this study.</strong>
              I have read the consent form above and understand that participation is voluntary and that I may stop at any
              time.
            </span>
          </label>
          <p>
            Your selection and submission time will be recorded as electronic consent for Prolific ID{" "}
            <strong>{participantId}</strong>. You can open or save the original PDF above for your records.
          </p>
        </div>

        <div className="footer-actions consent-actions">
          <p>{postingError || (isSubmitting ? "Saving consent..." : "Consent is required before continuing.")}</p>
          <div className="nav-actions">
            <button className="secondary-button" disabled={isSubmitting} onClick={onBack} type="button">
              Back
            </button>
            <button className="primary-button" disabled={!acknowledged || isSubmitting} type="submit">
              {isSubmitting ? "Saving..." : "I agree and continue"}
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}
