function stripArticle(name) {
    return name.replace(/^(a |an |the )/i, "").trim();
  }

  function showSortedBands() {
    const username = document.getElementById("username").value.trim();
    const rawBands = document.getElementById("bandInput").value.trim();

    if (!username || !rawBands) {
      alert("Please enter your name and band names.");
      return;
    }

    // Split band names by comma or newline
    const bands = rawBands
      .split(/[\n,]+/)
      .map(b => b.trim())
      .filter(b => b.length > 0);

    const sortedBands = bands.sort((a, b) =>
      stripArticle(a).localeCompare(stripArticle(b))
    );

    // Update heading
    const heading = document.getElementById("user-heading");
    heading.textContent = `Hello, ${username}! Here are your sorted bands:`;
    heading.style.display = "block";

    // Display sorted bands
    const ul = document.getElementById("band-list");
    ul.innerHTML = "";
    sortedBands.forEach(band => {
      const li = document.createElement("li");
      li.textContent = band;
      ul.appendChild(li);
    });
    ul.style.display = "block";
  }