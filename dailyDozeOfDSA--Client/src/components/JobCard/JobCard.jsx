import React from "react";
import styles from "./JobCard.module.css";
// import googleLogo from "../../assets/googleLogo.jpeg";

function JobCard({ companyName, jobTitle, tags, applyLink, company }) {
  return (
    <div className={styles.jobCard}>
      <div className={styles.companyLogo}>
      <img
          src={company?.companyLogo || "/suitcase[1].png"} 
          alt={`${companyName} Logo`} 
          className={styles.logoImg}
        />
      </div>
      <div className={styles.jobDetails}>
        <p>
          {companyName} - <span className={styles.jobDesc}>{jobTitle}</span>
        </p>
        <div className={styles.tagContainer}>
          {tags.map((tag, index) => (
            <span key={index} className={styles.tag}>
              {tag.tagName}
            </span>
          ))}
        </div>
      </div>
      <div className={styles.applyLink}>
        <button
          className={styles.applyButton}
          onClick={() => window.open(applyLink, "_blank")}
        >
          <span className={styles.applyButtonText}>Apply Now</span>
        </button>
      </div>
    </div>
  );
}

export default JobCard;
