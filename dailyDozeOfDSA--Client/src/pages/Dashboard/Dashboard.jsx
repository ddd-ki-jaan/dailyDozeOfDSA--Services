import React from "react";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Profile</h1>

      <div className={styles.profileSection}>
        {/* Profile Section */}
        <div className={styles.card}>
          <div className={styles.avatar}></div>
          <div className={styles.cardBody}>
            <h2 className={styles.cardTitle}>Name: Saquib X</h2>
            <p>Id: abc</p>
          </div>
        </div>

        {/* Email and Social Links Section */}
        <div className={styles.card}>
          <div className={styles.cardBody}>
            <h2 className={styles.cardTitle}>Social Profile</h2>
            <div className={styles.socialIcons}>
              <button className={styles.iconButton}>
                <i className="bi bi-linkedin"></i>
              </button>
              <button className={styles.iconButton}>
                <i className="bi bi-github"></i>
              </button>
              <button className={styles.iconButton}>
                <i className="bi bi-pencil"></i>
              </button>
              <button className={styles.iconButton}>
                <i className="bi bi-trash"></i>
              </button>
            </div>
            <button className={styles.addButton}>Add +</button>
          </div>
        </div>

        {/* Coding Profiles Section */}
        <div className={styles.card}>
          <div className={styles.cardBody}>
            <h2 className={styles.cardTitle}>Coding Profiles</h2>
            <div className={styles.codingIcons}>
              {[...Array(4)].map((_, index) => (
                <div key={index} className={styles.codingIcon}>
                  XY
                </div>
              ))}
            </div>
            <button className={styles.addButton}>Add +</button>
          </div>
        </div>
      </div>

      {/* Sheet Stats Section */}
      <div className={styles.card}>
        <div className={styles.statsSection}>
          {[...Array(4)].map((_, index) => (
            <div key={index} className={styles.statCard}>
              <div className={styles.statCircle}></div>
              <h3 className={styles.cardTitle}>A to Z</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Jobs and Notes Section */}
      <div className={styles.flexSection}>
        {/* Jobs Section */}
        <div className={styles.card}>
          <div className={styles.cardBody}>
            <h2 className={styles.cardTitle}>Jobs</h2>
            <button className={styles.jobButton}>Saved</button>
            <button className={styles.jobButton}>Applied</button>
          </div>
        </div>

        {/* Notes Section */}
        <div className={styles.card}>
          <div className={styles.cardBody}>
            <h2 className={styles.cardTitle}>Notes</h2>
            <button className={styles.noteButton}>Bookmarks</button>
            <button className={styles.noteButton}>Favourite</button>
            <button className={styles.noteButton}>Upload</button>
          </div>
        </div>
      </div>

      {/* Feedback and Contact Section */}
      <div className={styles.feedbackSection}>
        <button className={styles.feedbackButton}>Feedback</button>
        <button className={styles.feedbackButton}>Report Bug</button>
        <button className={styles.feedbackButton}>Contact us</button>
      </div>
    </div>
  );
};

export default Dashboard;
