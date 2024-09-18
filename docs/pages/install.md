## 📝 准备工作
⚠️  **重要**：选择一台国外服务器，并且未被墙。对于域名，无需进行国内备案。你也可以通过一些平台申请免费域名。在一键部署过程中，如果选择安装Caddy，它将自动配置HTTPS。若选择部署Nginx服务，则需要自行申请一个免费的SSL证书，或者通过其他方式来实现SSL加密。

> **高性价比海外 VP 推荐**：[点击查看](https://dqzboy.github.io/proxyui/racknerd) 



## 📦 部署教程
### 一键部署
```shell
# CentOS && RHEL && Rocky
yum -y install curl
# ubuntu && debian
apt -y install curl

# 国外环境
bash -c "$(curl -fsSL https://raw.githubusercontent.com/dqzboy/Docker-Proxy/main/install/DockerProxy_Install.sh)"

# 国内环境
bash -c "$(curl -fsSL https://cdn.jsdelivr.net/gh/dqzboy/Docker-Proxy/install/DockerProxy_Install.sh)"
```


### Docker Compose 部署

**⚠️ 注意：** 你需要对哪个镜像仓库进行加速，就下载哪个配置。`docker-compose.yaml`文件默认是部署所有的国外镜像仓库的加速服务，同样也是你部署哪个就配置哪个，其余的删除掉即可！

**1.** 下载[config](https://github.com/dqzboy/Docker-Proxy/tree/main/config)目录下对应的`yml`文件到你本地机器上

**2.** 下载[docker-compose.yaml](https://github.com/dqzboy/Docker-Proxy/blob/main/docker-compose.yaml)文件到你本地机器上，并且与配置文件同级目录下

**3.** 执行 `docker compose` 或 `docker-compose` 命令启动容器服务
```shell
# 启动全部容器
docker compose up -d

# 启动指定的容器,例如: Docker Hub Registry Proxy
docker compose up -d dockerhub

# 查看容器日志
docker logs -f [容器ID或名称]
```


## 📦 部署到第三方平台
### 部署到 Render
> Render 提供免费额度，绑卡后可以进一步提升额度

**1. 登入 [Render](https://dashboard.render.com)**

**2. 创建我们的服务**
<table>
    <tr>
        <td width="50%" align="center"><img src="https://github.com/dqzboy/Blog-Image/assets/42825450/7a16000a-6514-4cc9-892c-9f0a9746d1b2?raw=true"></td>
    </tr>
</table>

<table>
    <tr>
        <td width="50%" align="center"><img src="https://github.com/dqzboy/Docker-Proxy/assets/42825450/e5bb8e70-2bba-4b3f-a29f-fcf56ac2b82a?raw=true"></td>
    </tr>
</table>

**3. 选择以docker容器的方式部署，输入下面任一镜像地址**

> **⚠️ 特别说明：当前作者Docker Hub仓库账号已被Render特殊对待了,建议大家把下面的镜像下载到自己本地，然后上传到自己的Docker hub仓库。下面的镜像地址也会随时被Render限制使用[具体操作可以看此教程](#-将镜像上传到自己的docker-hub仓库)**

| 镜像 | 平台 |
|-------|---------------|
| mirhub/mirror-hub:latest   | docker hub
| mirhub/mirror-gcr:latest      | Google Container Registry
| mirhub/mirror-ghcr:latest     | GitHub Container Registry
| mirhub/mirror-k8sgcr:latest  | Kubernetes Container Registry
| mirhub/mirror-k8sreg:latest      | Kubernetes's container image registry
| mirhub/mirror-quay:latest     | Quay Container Registry
| mirhub/mirror-elastic:latest     | Microsoft Container Registry
| mirhub/mirror-mcr:latest     | Elastic Stack

<table>
    <tr>
        <td width="50%" align="center"><img src="https://github.com/dqzboy/Docker-Proxy/assets/42825450/3f84c551-bef4-4e00-a3b4-b85e34a7eb7e?raw=true"></td>
    </tr>
</table>

<table>
    <tr>
        <td width="50%" align="center"><img src="https://github.com/dqzboy/Docker-Proxy/assets/42825450/907ba8da-9c1d-4cfb-9951-b843fabe47a9?raw=true"></td>
    </tr>
</table>

**4. 实例类型选择免费即可(免费实例需要保活,可使用 [uptime-kuma](https://uptime.kuma.pet/) 或 [D监控](https://www.dnspod.cn/Products/Monitor) 实现)**

<table>
    <tr>
        <td width="50%" align="center"><img src="https://github.com/dqzboy/Blog-Image/assets/42825450/c0a166c9-9d06-472e-a4cd-0d16fa3eeb83?raw=true"></td>
    </tr>
</table>

**5. 环境变量不用添加，直接选择创建即可**
<table>
    <tr>
        <td width="50%" align="center"><img src="https://github.com/dqzboy/Blog-Image/assets/42825450/e760d9c3-b6f4-4a5e-81ce-64c8017c70fc?raw=true"></td>
    </tr>
</table>

**6. 等待服务运行完成之后，使用分配的外网域名即可愉快的使用了**
<table>
    <tr>
        <td width="50%" align="center"><img src="https://github.com/dqzboy/Docker-Proxy/assets/42825450/95793a23-5831-4565-9c23-03130b81e8be?raw=true"></td>
    </tr>
</table>

#### ✨ 使用

**1. 改Docker的daemon.json配置，配置你Render服务地址。修改后重启docker**
```shell
~]# vim /etc/docker/daemon.json
{
    "registry-mirrors": [ "https://your_render_url" ],
    "log-opts": {
      "max-size": "100m",
      "max-file": "5"
    }
}
```
**2. 使用Render服务地址替换官方的 Registry 地址拉取镜像**
```shell
# docker hub Registry
## 源：redis:latest
## 替换
docker pull your_render_url/library/redis:latest
```

> **说明**：如果上面配置了docker的`daemon.json`，那么拉取镜像的时候就不需要在镜像前面加`Render_URL`了。【只针对拉取Docker Hub上的镜像有效】

**3. 拉取速度测试，效果还是可以的，主要是免费**
![image](https://github.com/dqzboy/Blog-Image/assets/42825450/06ad14d4-cb0f-4924-ab41-5c3f001261a2)

**4. 前缀替换的 Registry 的参考**

| 源站 | 替换为 | 平台 |
|-------|---------------|----------|
| docker.io   | your_render_url   |  docker hub 
| gcr.io      | your_render_url   |  Google Container Registry
| ghcr.io     | your_render_url  |  GitHub Container Registry
| k8s.gcr.io     | your_render_url  | Kubernetes Container Registry
| quay.io     | your_render_url  | Quay Container Registry
| mcr.microsoft.com     | mcr.your_domain_name  | Microsoft Container Registry
| docker.elastic.co     | elastic.your_domain_name  | Elastic Stack


---

#### ✨ 将镜像上传到自己的Docker Hub仓库

| 镜像 | 平台 |
|-------|---------------|
| dqzboy/mirror-hub:latest   | docker hub
| dqzboy/mirror-gcr:latest      | Google Container Registry
| dqzboy/mirror-ghcr:latest     | GitHub Container Registry
| dqzboy/mirror-k8sgcr:latest  | Kubernetes Container Registry
| dqzboy/mirror-k8sreg:latest      | Kubernetes's container image registry
| dqzboy/mirror-quay:latest     | Quay Container Registry
| dqzboy/mirror-mcr:latest     | Microsoft Container
| dqzboy/mirror-elastic:latest     | Elastic Stack

**步骤 1: 登录到 Docker Hub**
- 打开终端输入以下命令并按提示输入你的 Docker Hub 用户名和密码：

```shell
docker login
```

**步骤 2: 拉取镜像**
- 使用 docker pull 命令拉取上面的镜像，这里以 dqzboy/mirror-hub:latest 举例：

```shell
docker pull dqzboy/mirror-hub:latest
```

**步骤 3: 标记镜像**
- 给拉下来的镜像打一个新标签，使其指向你的 Docker Hub 用户名。
- 假设你的 Docker Hub 用户名是 yourusername，你可以使用以下命令：

```shell
docker tag dqzboy/mirror-hub:latest yourusername/mirror-hub:latest
```

**步骤 4: 上传镜像**
- 使用 docker push 命令上传标记的镜像到你的 Docker Hub 仓库：

```shell
docker push yourusername/mirror-hub:latest
```

**步骤 5: 验证上传**
- 上传完成后，你可以登录到 Docker Hub 网站，查看你的仓库中是否已经存在刚刚上传的镜像。

---

#### ⚠️ 注意
**1.** 免费实例如果15分钟内未收到入站流量，Render会关闭实例的网络服务。Render 会在下次收到处理请求时重新启动该服务。

**2.** Render每月为每个用户和团队提供 750 小时的免费实例时间：
   - 免费网络服务在运行期间会消耗这些时间（停止服务不会消耗免费实例小时数）
   - 如果您在某个月内用完了所有免费实例小时数，Render将暂停您的所有免费网络服务，直到下个月开始
   - 每个月开始时，您的免费实例小时数将重置为 750 小时（剩余小时数不会结转）

**3.** 最好自己个人使用或者小团队使用，如果你的服务使用人多了，Render照样会把你的服务给删除掉，并且没有任何提醒或通知！


### 部署到 Koyeb
> Koyeb 分配的域名在国内地区访问不是很稳定，不是很推荐！

**1. 登入 [Koyeb](https://app.koyeb.com/auth/signup/)**

<table>
    <tr>
        <td width="50%" align="center"><img src="https://github.com/dqzboy/Docker-Proxy/assets/42825450/671ac907-35e9-4e33-8ecb-8f1787ea818d?raw=true"></td>
    </tr>
</table>

**2. 创建我们的服务**

<table>
    <tr>
        <td width="50%" align="center"><img src="https://github.com/dqzboy/Docker-Proxy/assets/42825450/c14f1109-3c48-4c00-876b-1bbf8f7e1939?raw=true"></td>
    </tr>
</table>

**3. 选择以docker容器的方式部署，输入下面任一镜像地址**

| 镜像 | 平台 |
|-------|---------------|
| dqzboy/mirror-hub:latest   | docker hub
| dqzboy/mirror-gcr:latest      | Google Container Registry
| dqzboy/mirror-ghcr:latest     | GitHub Container Registry
| dqzboy/mirror-k8sgcr:latest  | Kubernetes Container Registry
| dqzboy/mirror-k8sreg:latest      | Kubernetes's container image registry
| dqzboy/mirror-quay:latest     | Quay Container Registry
| dqzboy/mirror-mcr:latest     | Microsoft Container
| dqzboy/mirror-elastic:latest     | Elastic Stack

<table>
    <tr>
        <td width="50%" align="center"><img src="https://github.com/dqzboy/Docker-Proxy/assets/42825450/7f0df696-f4b6-41db-8ba5-5e28cb58fc17?raw=true"></td>
    </tr>
</table>

<table>
    <tr>
        <td width="50%" align="center"><img src="https://github.com/dqzboy/Docker-Proxy/assets/42825450/6c407af3-5a17-49bb-9c31-45a6fcf8cedd?raw=true"></td>
    </tr>
</table>


**4. 实例类型选择免费即可**

<table>
    <tr>
        <td width="50%" align="center"><img src="https://github.com/dqzboy/Docker-Proxy/assets/42825450/037cd5b2-801f-4ccf-b4c6-ec3f288b08c6?raw=true"></td>
    </tr>
</table>

**5. 暴露端口改为5000，自定义服务名称，然后直接创建即可**
<table>
    <tr>
        <td width="50%" align="center"><img src="https://github.com/dqzboy/Docker-Proxy/assets/42825450/323bf282-804e-49ab-8251-7ebd6c8f8969?raw=true"></td>
    </tr>
</table>

**6. 等待服务运行完成之后，使用分配的外网域名即可愉快的使用了**
<table>
    <tr>
        <td width="50%" align="center"><img src="https://github.com/dqzboy/Docker-Proxy/assets/42825450/cea37723-45f2-48df-bc59-9df97823adaa?raw=true"></td>
    </tr>
</table>
<table>
    <tr>
        <td width="50%" align="center"><img src="https://github.com/dqzboy/Docker-Proxy/assets/42825450/54437313-f104-48ee-8e81-49dfe95a2118?raw=true"></td>
    </tr>
</table>


#### ✨ 使用

**1. 改Docker的daemon.json配置，配置你Koyeb服务地址。修改后重启docker**
```shell
~]# vim /etc/docker/daemon.json
{
    "registry-mirrors": [ "https://your_koyeb_url" ],
    "log-opts": {
      "max-size": "100m",
      "max-file": "5"
    }
}
```
**2. 使用Koyeb服务地址替换官方的 Registry 地址拉取镜像**
```shell
# docker hub Registry
## 源：redis:latest
## 替换
docker pull your_koyeb_url/library/redis:latest
```

> **说明**：如果上面配置了docker的`daemon.json`，那么拉取镜像的时候就不需要在镜像前面加`Koyeb_URL`了。【只针对拉取Docker Hub上的镜像有效】


**3. 前缀替换的 Registry 的参考**

| 源站 | 替换为 | 平台 |
|-------|---------------|----------|
| docker.io   | your_render_url   |  docker hub 
| gcr.io      | your_render_url   |  Google Container Registry
| ghcr.io     | your_render_url  |  GitHub Container Registry
| k8s.gcr.io     | your_render_url  | Kubernetes Container Registry
| quay.io     | your_render_url  | Quay Container Registry
| mcr.microsoft.com     | mcr.your_domain_name  | Microsoft Container Registry
| docker.elastic.co     | elastic.your_domain_name  | Elastic Stack

**4. 说明：** 测试发现Koyeb所解析的IP为cloudfare的，国内部分地区运营商对cloudfare进行了阻断，所以这些地区则无法正常访问！

---

#### ✨ 将镜像上传到自己的Docker Hub仓库

**步骤 1: 登录到 Docker Hub**
- 打开终端输入以下命令并按提示输入你的 Docker Hub 用户名和密码：

```shell
docker login
```

**步骤 2: 拉取镜像**
- 使用 docker pull 命令拉取上面的镜像，这里以 dqzboy/mirror-hub:latest 举例：

```shell
docker pull dqzboy/mirror-hub:latest
```

**步骤 3: 标记镜像**
- 给拉下来的镜像打一个新标签，使其指向你的 Docker Hub 用户名。
- 假设你的 Docker Hub 用户名是 yourusername，你可以使用以下命令：

```shell
docker tag dqzboy/mirror-hub:latest yourusername/mirror-hub:latest
```

**步骤 4: 上传镜像**
- 使用 docker push 命令上传标记的镜像到你的 Docker Hub 仓库：

```shell
docker push yourusername/mirror-hub:latest
```

**步骤 5: 验证上传**
- 上传完成后，你可以登录到 Docker Hub 网站，查看你的仓库中是否已经存在刚刚上传的镜像。


## ✨ Nginx反向代理
### 配置Nginx反向代理
> **注意**： 如果你选择部署的是Nginx，那么代理程序部署完成之后，需自行配置 Nginx <br>

**1.下载仓库下的nginx配置文件 [registry-proxy.conf](https://raw.githubusercontent.com/dqzboy/Docker-Proxy/main/nginx/registry-proxy.conf) 到你的nginx服务下，并修改配置里的域名和证书部分** <br>
**2.在你的DNS服务提供商将相应的访问域名解析到部署docker proxy服务的机器IP上** <br>
**3.修改Docker的daemon.json配置，配置你自建的Registry地址。修改后重启docker**
```shell
~]# vim /etc/docker/daemon.json
{
    "registry-mirrors": [ "https://hub.your_domain_name" ]
}
```

> **说明：** 配置了`daemon.json`之后，现在拉取镜像无需指定你的加速地址，直接执行`docker pull`拉取你需要的镜像即可。下面的步骤是你在没有配置`daemon.json`的时候，拉取镜像需要加上你的加速地址才可以正常拉取。

---

**1. 使用自建的 Registry 地址替换官方的 Registry 地址拉取镜像**
```shell
# docker hub Registry
## 源：nginx:latest
## 替换
docker pull hub.your_domain_name/library/nginx:latest

# Google Registry
## 源：gcr.io/google-containers/pause:3.1
## 替换：
docker pull gcr.your_domain_name/google-containers/pause:3.1
```

**2. 前缀替换的 Registry 的参考**

| 源站 | 替换为 | 平台 |
|-------|---------------|----------|
| docker.io   | hub.your_domain_name   |  docker hub 
| gcr.io      | gcr.your_domain_name   |  Google Container Registry
| ghcr.io     | ghcr.your_domain_name  |  GitHub Container Registry
| k8s.gcr.io     | k8s-gcr.your_domain_name  | Kubernetes Container Registry
| registry.k8s.io     | k8s.your_domain_name  | Kubernetes's container image registry
| quay.io     | quay.your_domain_name  | Quay Container Registry
| mcr.microsoft.com     | mcr.your_domain_name  | Microsoft Container Registry
| docker.elastic.co     | elastic.your_domain_name  | Elastic Stack
| nvcr.io    | nvcr.your_domain_name  | NVIDIA Container Registry


> **详细教程：** <br>
> [自建Docker镜像加速服务：加速与优化镜像管理](https://www.dqzboy.com/8709.html)<br>
> [自建Docker镜像加速，并把域名托管到CF加速镜像拉取](https://www.dqzboy.com/17665.html)

## 📚 展示
<br/>
<table>
    <tr>
      <td width="50%" align="center"><b>系统环境检查</b></td>
      <td width="50%" align="center"><b>服务部署安装</b></td>
    </tr>
    <tr>
        <td width="50%" align="center"><img src="https://github.com/dqzboy/Docker-Proxy/assets/42825450/55df7f6f-c788-4200-9bcd-631998dc53ef?raw=true"></td>
        <td width="50%" align="center"><img src="https://github.com/dqzboy/Docker-Proxy/assets/42825450/c544fb1e-ecd5-447c-9661-0c5913586118?raw=true"></td>
    </tr>
</table>

## 💻 UI界面

> HubCMD-UI 手动安装教程：[点击查看教程](https://github.com/dqzboy/Docker-Proxy/blob/main/hubcmdui/README.md)

<br/>
<table>
    <tr>
      <td width="50%" align="center"><b>Docker Registry UI</b></td>
      <td width="50%" align="center"><b>Docker-Proxy CmdUI</b></td>
    </tr>
    <tr>
        <td width="50%" align="center"><img src="https://github.com/dqzboy/Docker-Proxy/assets/42825450/0ddb041b-64f6-4d93-b5bf-85ad3b53d0e0?raw=true"></td>
        <td width="50%" align="center"><img src="https://github.com/user-attachments/assets/c7e368ca-7f1a-4311-9a10-a5f4f06d86d8?raw=true"></td>
    </tr>
    <tr>
      <td width="50%" align="center"><b>Docker官方镜像搜索</b></td>
      <td width="50%" align="center"><b>Docker容器服务管理</b></td>
    </tr>
    <tr>
        <td width="50%" align="center"><img src="https://github.com/user-attachments/assets/8569c5c4-4ce6-4cd4-8547-fa9816019049?raw=true"></td>
        <td width="50%" align="center"><img src="https://github.com/user-attachments/assets/fb30f747-a2af-4fc8-b3cc-05c71a044da0?raw=true"></td>
    </tr>
</table>
