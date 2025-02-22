import os
import json

def path_to_dict(path):
    d = {'name': os.path.basename(path), 'path': path.replace("\\", "/")}
    if os.path.isdir(path):
        d['type'] = "directory"
        d['children'] = []
        # 先处理所有子目录，然后处理文件
        for x in os.listdir(path):
            child_path = os.path.join(path, x)
            if os.path.isdir(child_path):
                d['children'].append(path_to_dict(child_path))
        for x in os.listdir(path):
            child_path = os.path.join(path, x)
            if not os.path.isdir(child_path):
                d['children'].append({'name': os.path.basename(child_path), 'path': child_path.replace("\\", "/"), 'type': 'file'})
    else:
        d['type'] = "file"
    return d

# 假设您正在处理的目录是 'Files'
root_directory = 'Files'  # 请根据实际情况修改此路径
structure = path_to_dict(root_directory)

# 将结构写入 JSON 文件
json_file_path = "Files/dir_structure.json"
with open(json_file_path, 'w', encoding='utf-8') as json_file:
    json.dump(structure, json_file, ensure_ascii=False, indent=4)

print("目录结构已保存为 JSON 文件。")
