// 读取JSON文件并生成更新日志目录
async function loadUpdates() {
  try {
    const response = await fetch("index.json");
    const updates = await response.json();
    const updateList = document.getElementById("items");

    // 遍历JSON对象并生成列表项
    for (vals in updates) {
      const at = document.createElement("article");
      const a = document.createElement("a");
      const p = document.createElement("p");
      const h2 = document.createElement("h2");
      a.href = updates[vals].thelink;
      a.className = "link";
      a.textContent = `${updates[vals].title}`;
      p.textContent = `${updates[vals].thetext}`;
      h2.appendChild(a);
      at.appendChild(h2);
      at.appendChild(p);
      updateList.appendChild(at);
    }
  } catch (error) {
    console.error("加载更新日志时出错:", error);
  }
}

// 调用函数加载更新日志
loadUpdates();
