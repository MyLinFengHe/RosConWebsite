#!/bin/bash

#ghrocker --build-only .


#!/bin/bash

# 获取脚本所在的绝对路径，这样脚本可以在任何地方被调用
# (假设 build_site.bash 放在项目根目录)
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
PROJECT_ROOT="$SCRIPT_DIR"

echo "==> Running Jekyll build inside Docker with host user mapping..."
echo "==> Project Source (Host): $PROJECT_ROOT"
echo "==> Container Workdir: /tmp/jekyll"
echo "==> Host User: $(id -u):$(id -g)"

# 使用 docker run 直接调用 jekyll build，并添加 --user 参数
docker run --rm -it \
  -w /tmp/jekyll \
  -v "$PROJECT_ROOT":/tmp/jekyll \
  --user $(id -u):$(id -g) \
  ghcr.io/tfoote/ghrocker/ghrocker:latest \
  jekyll build -d /tmp/jekyll/2025

# 你可以加上 --trace 参数进行调试:
# jekyll build -d /tmp/jekyll/2025 --trace

# 获取 docker run 命令的退出状态码
EXIT_CODE=$?

# 根据退出状态码判断构建是否成功
if [ $EXIT_CODE -eq 0 ]; then
  echo "==> Build successful! Output generated in '$PROJECT_ROOT/2025'."
else
  echo "==> Build failed with exit code $EXIT_CODE." >&2 # 输出到标准错误
fi

# 以相同的退出状态码退出脚本
exit $EXIT_CODE
