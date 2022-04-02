function createBtn(parent) {

  const summary = document.querySelector('[data-test-id="issue.views.issue-base.foundation.summary.heading"]').textContent;

  const searchSummary = `[data-tooltip="${summary.replaceAll(`"`, `\\"`)}"]`;

  const checkSummary = document.querySelector(searchSummary);

  const checkBoardIssue = document.getElementsByClassName("ghx-swimlane-header ghx-selected");

  console.log(checkBoardIssue);

  const btnText = 'Copy Issue Id + Title';

  let btn = document.createElement("button");
  btn.textContent = btnText;
  btn.id = "CopyBtnJiraId";
  btn.className = "CopyBtnForJira";
  parent.appendChild(btn);

  btn.onclick = function () {
    escapedSummary = summary.replaceAll( `\\"` ,`"`);
    if (checkSummary) {
      const issueKey = checkSummary.parentNode.dataset['issueKey'];

      if (issueKey) {
        const keyPlusSummary = `[${issueKey}] ${escapedSummary}`;
        navigator.clipboard.writeText(keyPlusSummary);
      } else {
        //Backlog
        const keyPlusSummary = `[${checkSummary.parentNode.parentNode.parentNode.dataset['issueKey']}] ${escapedSummary}`;
        navigator.clipboard.writeText(keyPlusSummary);
      }

    } else if (checkBoardIssue.length > 0) {
      const keyPlusSummary = `[${checkBoardIssue[0].attributes[1].textContent}] ${escapedSummary}`;
      navigator.clipboard.writeText(keyPlusSummary);
    } else {
      navigator.clipboard.writeText(document.title.replace(" - JIRA", ""));
    }

    btn.textContent = 'text has been copied!';
    setTimeout(function () {
      btn.textContent = btnText;
    }.bind(this), 2000);
  }
}

var observer = new MutationObserver(function (mutations, me) {
  //var parent = document.getElementById('jira-issue-header');
  var parent = document.getElementsByClassName('um2giz-0 guBgLL')[0];
  if (parent) {
    if (!document.getElementById('CopyBtnJiraId')) {
      createBtn(parent);
    }
    return;
  }
});

observer.observe(document, {
  childList: true,
  subtree: true
});



