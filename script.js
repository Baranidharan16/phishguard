async function analyze() {
    const message = document.getElementById("message").value;

    const response = await fetch("http://localhost:8000/detect", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ content: message })
    });

    const data = await response.json();

    const resultDiv = document.getElementById("result");
    const score = document.getElementById("score");
    const verdict = document.getElementById("verdict");

    resultDiv.classList.remove("hidden", "safe", "suspicious", "phishing");

    score.innerText = "Risk Score: " + data.risk_score + "%";
    verdict.innerText = "Verdict: " + data.verdict;

    if (data.verdict === "Safe") {
        resultDiv.classList.add("safe");
    } else if (data.verdict === "Suspicious") {
        resultDiv.classList.add("suspicious");
    } else {
        resultDiv.classList.add("phishing");
    }
}
