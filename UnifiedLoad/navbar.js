const currentUrlPath = window.location.pathname;
const targetPath = "/";


function getRelativePath() {
  const currentParts = currentUrlPath.split("/").filter(Boolean); // 过滤掉空字符串
  const targetParts = targetPath.split("/").filter(Boolean); // 过滤掉空字符串
  let commonLength = 0;
  const minLength = Math.min(currentParts.length, targetParts.length);

  for (let i = 0; i < minLength; i++) {
    if (currentParts[i] === targetParts[i]) {
      commonLength++;
    } else {
      break;
    }
  }
  const upwardMoves = currentParts.length - commonLength;
  const downwardMoves = targetParts.slice(commonLength); // 目标路径的下移部分
  const relativePath = "../".repeat(upwardMoves) + downwardMoves.join("/");

  return relativePath || "./"; 
}

nowpath = getRelativePath();

document.addEventListener("DOMContentLoaded", function () {


  // 创建导航栏的 HTML 代码
  const navbarHTML = `
        <nav id="navbar">
            <ul>
                <li><a href="${nowpath}" class="nav-link" >主页</a></li>
                <li><a href="${nowpath}MyFiles/" class="nav-link">文件</a></li>
                <li><a href="${nowpath}Games/" class="nav-link">游戏</a></li>
                <li><a href="${nowpath}Updates/" class="nav-link">更新</a></li>
                 <li><a href="${nowpath}Articles/" class="nav-link">文章</a></li>
            </ul>
        </nav>
    `;

  // 将导航栏插入到页面中
  document.body.insertAdjacentHTML("afterbegin", navbarHTML);
});
