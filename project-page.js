window.addEventListener("DOMContentLoaded", initPage);

function initPage() {
  const queryString =
    window.location
      .search; /* Example: ?product=shirt&color=blue&newuser&size=m */
  const urlParams = new URLSearchParams(queryString);
  const parsedSiteId = urlParams.get("id"); // ?cat=something

  // Load the JSON file using fetch
  let foundElement = null;
  fetch("student-info.json")
    .then((response) => response.json())
    .then((data) => {
      // Iterate through the array to find the element with the specific attribute
      const desiredId = parsedSiteId; // The specific attribute value you are looking for
      foundElement = data.find((item) => item.net_id === desiredId);

      // Check if the element was found
      if (foundElement) {
        console.log("Element found:", foundElement);
        document.getElementById("title").textContent =
          foundElement.project_title;
        document.getElementById("name").textContent = foundElement.full_name;
        let year = "";
        if (foundElement.year === "Final Year Grad (Thesis Project)") {
          year = "Graduate Thesis";
        } else {
          year = "Senior Thesis";
        }
        document.getElementById("year").textContent = year + " ";
        document.getElementById("medium").textContent = foundElement.medium;

        let link = document.getElementById("link");
        let linkA = document.createElement("a");
        // linkA.textContent = foundElement.project_link;
        linkA.textContent = "view project";
        linkA.href = foundElement.project_link;
        link.appendChild(linkA);

        document.getElementById("description").textContent =
          foundElement.description;

        if (foundElement.keywords !== "")
          document.getElementById("keywords").textContent =
            "Keywords: " + foundElement.keywords;
        else document.getElementById("keywords").remove();

        // document.getElementById("personal-link").textContent =
        //   foundElement.portfolio_link;
        document.getElementById("personal-link").textContent =
          "view their portfolio";
        document.getElementById("personal-link").href =
          foundElement.portfolio_link;
        document.addEventListener("click", function (portfolio_link) {
          if (
            portfolio_link.target.tagName == "A" &&
            !portfolio_link.target.hasAttribute("target")
          ) {
            portfolio_link.target.setAttribute("target", "_blank");
          }
        });

        document.getElementById("linkedin").textContent = foundElement.linkedin;
        // document.getElementById("linkedin").textContent = "linkedin";
        document.getElementById("linkedin").href = foundElement.linkedin;
        document.addEventListener("click", function (linkedin) {
          if (
            linkedin.target.tagName == "A" &&
            !linkedin.target.hasAttribute("target")
          ) {
            linkedin.target.setAttribute("target", "_blank");
          }
        });

        var mainImg = document.getElementById("main-img");
        if (foundElement.hasOwnProperty("image_path")) {
          mainImg.childNodes[0].src = foundElement.image_path;
        }
      } else {
        console.log("Element not found");
      }
    })
    .catch((error) => console.error("Error loading JSON file:", error));
}