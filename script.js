let currentPath = '';
let breadcrumbPath = [];
let directoryData = {}; // 存储加载的目录数据

function loadInitialDirectory() {
    fetch('Files/directory_structure.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            directoryData = data; // 存储目录数据
            currentPath = 'Files'; // 设置当前路径为根目录
            breadcrumbPath = [{ name: 'Files', path: 'Files' }]; // 重置面包屑路径
            updateBreadcrumb();
            displayFiles(directoryData); // 显示根目录下的文件和文件夹
        })
        .catch(error => console.error('Error loading directory:', error));
}

function loadDirectory(folder) {
    const folderData = findFolder(directoryData, folder);
    if (folderData) {
        currentPath = folderData.path;

        // 如果当前目录不在 breadcrumbPath 中，则添加
        if (!breadcrumbPath.some(f => f.name === folderData.name && f.path === folderData.path)) {
            breadcrumbPath.push({ name: folderData.name, path: folderData.path });
        }

        updateBreadcrumb();
        displayFiles(folderData); // 直接在内存中显示文件和文件夹
    }
}

function findFolder(data, folderName) {
    if (data.name === folderName) {
        return data; // 找到文件夹，返回
    }
    for (let child of data.children) {
        if (child.type === 'directory') {
            const found = findFolder(child, folderName);
            if (found) return found; // 递归查找
        }
    }
    return null; // 未找到
}

function updateBreadcrumb() {
    const breadcrumbDiv = document.getElementById('breadcrumb');
    breadcrumbDiv.innerHTML = ''; // 清空旧的内容

    // 显示当前路径
    breadcrumbPath.forEach((folder, index) => {
        const folderText = document.createElement('span');
        folderText.textContent = folder.name;
        folderText.className = 'breadcrumb-item'; // 添加样式类
        folderText.style.cursor = 'pointer'; // 指针样式

        // 为每个面包屑添加点击事件
        folderText.onclick = (event) => {
            event.stopPropagation(); // 防止事件冒泡
            
            const folderToLoad = breadcrumbPath[index]; // 获取要加载的文件夹
            if (folderToLoad) {
                // 清空 breadcrumbPath 之后的路径
                breadcrumbPath = breadcrumbPath.slice(0, index + 1); // 只保留到当前点击的目录
                loadDirectory(folderToLoad.name); // 加载对应的目录
            }
        };

        breadcrumbDiv.appendChild(folderText);

        // 添加箭头
        if (index < breadcrumbPath.length - 1) {
            const arrow = document.createElement('span');
            arrow.textContent = ' >> '; // 箭头符号
            arrow.className = 'breadcrumb-arrow'; // 添加样式类
            breadcrumbDiv.appendChild(arrow);
        }
    });
}

function displayFiles(files) {
    const fileList = document.getElementById('file-list');
    fileList.innerHTML = ''; // 清空旧的内容

    files.children.forEach(file => {
        const row = document.createElement('tr');
        const icon_text_before = file.type === 'directory' ? '📂  ' : '📄  ';
        const nameCell = document.createElement('td');
        nameCell.textContent = icon_text_before + " " + file.name;

        const actionsCell = document.createElement('td'); // 新增单元格用于操作
        actionsCell.style.textAlign = 'right'; // 右对齐
        const actionsDiv = document.createElement('div');
        
        const copyLinkButton = document.createElement('button');
        copyLinkButton.textContent = '📋复制链接';
        copyLinkButton.className = 'action-button';
        copyLinkButton.onclick = (e) => {
            e.stopPropagation(); // 防止点击事件传播
            copyFileLink(file.path);
        };

        const downloadButton = document.createElement('button');
        downloadButton.textContent = '📥下载';
        downloadButton.className = 'action-button';
        downloadButton.onclick = (e) => {
            e.stopPropagation(); // 防止点击事件传播
            downloadFile(file.path);
        };

        actionsDiv.appendChild(copyLinkButton);
        actionsDiv.appendChild(downloadButton);
        actionsCell.appendChild(actionsDiv); // 将按钮容器添加到操作单元格
        row.appendChild(nameCell);
        row.appendChild(actionsCell); // 添加操作单元格

        row.onclick = () => {
            if (file.type === 'directory') {
                loadDirectory(file.name); // 进入新目录
            } else {
                displayFileContent(file); // 显示文件内容
            }
        };

        fileList.appendChild(row);
    });
}


function displayFileContent(file) {
    fetch(file.path)
        .then(response => response.text())
        .then(content => {
            document.getElementById('file-title').textContent = file.name;

            // 创建元素以展示高亮之后的文件内容
            const fileDataDiv = document.getElementById('file-data');
            fileDataDiv.innerHTML = ''; // 清空内容
            const pre = document.createElement('pre');
            const code = document.createElement('code');

            // 根据文件扩展名动态设置语言
            const extension = file.path.split('.').pop();
            code.className = `language-${extension}`; // 根据文件扩展名设置语言类型
            code.textContent = content;
            pre.appendChild(code);
            fileDataDiv.appendChild(pre);

            // 使用 highlight.js 进行高亮处理
            hljs.highlightElement(code);

            document.getElementById('file-content').style.display = 'block';
        })
        .catch(error => console.error('Error loading file content:', error)); // 处理错误
}
function copyFileLink(filePath) {
    const fullLink = window.location.origin + '/' + filePath; // 创建完整链接
    navigator.clipboard.writeText(fullLink).then(() => {
        alert('文件链接已复制: ' + fullLink);
    }).catch(err => {
        console.error('复制失败:', err);
    });
}

function downloadFile(filePath) {
    const a = document.createElement('a');
    a.href = filePath; // 设置链接到文件路径
    a.download = ''; // 设置下载属性
    document.body.appendChild(a);
    a.click(); // 模拟点击下载
    document.body.removeChild(a); // 下载后清理DOM
}

// 启动初始加载
loadInitialDirectory();
