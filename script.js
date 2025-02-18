// Function to format date as DD/MM/YYYY
function formatDate(dateString) {
  let date = new Date(dateString);
  let day = String(date.getDate()).padStart(2, "0");
  let month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  let year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

// Function to fetch and display job listings
function loadJobs() {
  fetch("data/jobs.json")
      .then((response) => response.json())
      .then((jobs) => {
          let jobsContainer = document.getElementById("job-list");
          console.log("Jobs loaded:", jobs); // Debugging
          if (!jobsContainer) return;
          jobsContainer.innerHTML = ""; // Clear existing content

          jobs.forEach((job) => {
              let jobElement = document.createElement("div");
              jobElement.classList.add("job-card");
              jobElement.innerHTML = `
                  <h3><b>${job.title}</b></h3>
                  <p><strong>Company:</strong> ${job.company}</p>
                  <p><strong>Location:</strong> ${job.location}</p>
                  <p><strong>Salary:</strong> ${job.salary}</p>
                  <p><strong>Eligibility:</strong> ${job.eligibility}</p>
                  <p><strong>Last Date:</strong> ${job.last_date}</p> <!-- Keep the job date as is -->
                  <p><strong>Skills:</strong> ${job.skills.join(", ")}</p>
                  <a href="${job.apply_link}" target="_blank">Apply Now</a>
              `;
              jobsContainer.appendChild(jobElement);
          });
      })
      .catch((error) => {
          console.error("Error loading jobs:", error);
          document.getElementById("job-list").innerHTML =
              "<p>Failed to load jobs. Please try again later.</p>";
      });
}

// Function to fetch and display interview listings
function loadInterviews() {
  fetch("data/interviews.json")  // Path to the interviews JSON file
      .then((response) => response.json())
      .then((interviews) => {
          let interviewsContainer = document.getElementById("interview-list");
          if (!interviewsContainer) return;
          interviewsContainer.innerHTML = ""; // Clear existing content

          const currentDate = new Date(); // Get today's date

          // Filter out expired interviews
          const validInterviews = interviews.filter(
              (interview) => new Date(interview.date) >= currentDate
          );

          if (validInterviews.length === 0) {
              interviewsContainer.innerHTML = "<p>No upcoming interviews available.</p>";
              return;
          }

          validInterviews.forEach((interview) => {
              let interviewElement = document.createElement("div");
              interviewElement.classList.add("interview-card");
              interviewElement.innerHTML = `
                  <h3>${interview.title}</h3>
                  <p><strong>Company:</strong> ${interview.company}</p>
                  <p><strong>Location:</strong> ${interview.location}</p>
                  <p><strong>Date:</strong> ${formatDate(interview.date)}</p> <!-- Formatted Date -->
                  <p><strong>Time:</strong> ${interview.time}</p>
                  <p><strong>Venue:</strong> ${interview.venue}</p>
                  <p><strong>Contact:</strong> ${interview.contact}</p>
                  <p><strong>Eligibility:</strong> ${interview.eligibility}</p>
              `;
              interviewsContainer.appendChild(interviewElement);
          });
      })
      .catch((error) => {
          console.error("Error loading interviews:", error);
          document.getElementById("interview-list").innerHTML =
              "<p>Failed to load interviews. Please try again later.</p>";
      });
}

// Load content when the page is opened
document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("job-list")) {
      loadJobs(); // Load jobs if job-list exists
  }
  if (document.getElementById("interview-list")) {
      loadInterviews(); // Load interviews if interview-list exists
  }
});
