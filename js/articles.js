/* Piggy X · 学习心得数据 */
const ARTICLES = [
  {
    id: "career-change",
    title: "前端开发入门到入土",
    date: "2026-08-28",
    tag: "前端",
    tagClass: "t-career",
    summary: "科班出身却在文员岗待了四年，决定回来。这篇文章记录我重新出发的完整心路：怎么定方向、怎么排计划、怎么对抗焦虑。"
, content: `
<p>先交代背景：我是计算机科学与技术科班出身，毕业后却先后做了 PCB 工程文员、跨境订单运营文员。四年里我天天和"系统 + 数据 + 异常处理"打交道，技术上却在原地踏步。2026 年初，我决定回来。</p>
<h3>为什么敢转</h3>
<p>转行最怕的不是难，而是盲目。我盘点了一下手里有什么：</p>
<ul>
  <li><b>科班基础还在</b>——三级网络技术证书不是白考的，TCP/IP、DNS/DHCP 这些概念捡起来比零基础快得多；</li>
  <li><b>一线经验可迁移</b>——月均 3000+ 订单的异常闭环处理，本质上就是"故障定位 → 沟通协调 → 解决验证"，这就是 IT 支持 / 实施岗每天都在做的事；</li>
  <li><b>有过自动化实战</b>——自己写组合公式把核算效率提升 80%，说明我天然喜欢"用工具消灭重复劳动"，这正是运维思维的雏形。</li>
</ul>
<blockquote>结论：我不是从零转行，而是"回到主场 + 带回四年业务经验"。想清楚这一点，焦虑少了一大半。</blockquote>
<h3>方向怎么定</h3>
<p>我没选开发，选了 <b>IT 支持 / 运维 / 实施</b>。理由很实际：这三个岗位看重"动手 + 沟通 + 责任心"，正好是我的一线强项；技术上聚焦 Linux + Python + MySQL 三个模块，6-8 周就能达到面试够用水平，试错成本可控。</p>
<h3>计划怎么排</h3>
<p>我的原则是"面试导向，够用就好"，拒绝收藏夹吃灰式学习：</p>
<ol>
  <li><b>第 1-2 周</b>：Linux 常用命令 + 文件权限 + 日志查看，每天 2 小时，边敲边记；</li>
  <li><b>第 3-5 周</b>：Python 基础语法 → 文件处理 → 批量脚本，直接写"能替我干活"的小工具；</li>
  <li><b>第 6 周</b>：MySQL 增删改查 + 面试高频概念（索引、事务、引擎）；</li>
  <li><b>贯穿始终</b>：把部署 Claude Code、Codex、Hermes 这些 AI 工具的经历整理成项目故事——面试官很吃这套。</li>
</ol>
<h3>给同路人的三句话</h3>
<ul>
  <li>别和别人比进度，和上周的自己比；</li>
  <li>笔记要"写给别人看"的标准来写，将来全是面试素材；</li>
  <li>焦虑的时候就去敲命令，手感是最好的定心丸。</li>
</ul>
<img src="img/网络.jpg" alt="网络">
` },
  {
    id: "linux-20",
    title: "Linux 新手村：面试够用的命令清单",
    date: "2026-08-24",
    tag: "Linux",
    tagClass: "t-linux",
    summary: "不贪多，只留面试和日常最高频的命令：文件操作、权限、进程、日志、网络排查，每条都配一个真实使用场景。"
, content: `
<p>学 Linux 最容易犯的错是"背命令大全"。我的方法相反：只保留<b>面试会问 + 上手就用</b>的那部分，每条命令绑定一个场景记忆。</p>
<h3>文件与目录：每天都要用</h3>
<pre># 看看我在哪、有什么
pwd && ls -lh

# 找大文件（磁盘报警时第一步）
du -sh /var/log/* | sort -rh | head

# 实时盯着日志新增内容
tail -f /var/log/syslog</pre>
<p>面试常问 <code class="inline">ls -l</code> 输出第一列 <code class="inline">-rwxr-xr--</code> 什么意思——答"文件类型 + 属主/属组/其他人各自的读写执行权限"，再补一句"8 进制表示就是 754"，基本就稳了。</p>
<h3>权限三件套：chmod / chown / chgrp</h3>
<pre># 给脚本加可执行权限
chmod +x deploy.sh

# 递归修改目录属主
chown -R piggy:piggy /home/piggy/project</pre>
<blockquote>场景记忆法：部署脚本提示 Permission denied，第一反应 <code class="inline">ls -l</code> 看权限，缺 x 就 chmod +x。</blockquote>
<h3>进程与资源：服务器卡了先跑这几条</h3>
<pre>top              # 看 CPU / 内存，按 P 按 M 排序
ps -ef | grep nginx   # 确认进程在不在
kill -15 1234    # 优雅结束；-9 是强制（最后手段）
free -h          # 内存还剩多少
df -h            # 磁盘还剩多少</pre>
<p>面试高频：<b>kill -15 和 -9 的区别？</b>——15 是 SIGTERM，进程可以清理资源后退出；9 是 SIGKILL，内核直接终结，进程来不及收尾，可能丢数据。</p>
<h3>网络排查：支持岗的看家本领</h3>
<pre>ping baidu.com            # 通不通
ip a                      # 看本机网卡和 IP
ss -tlnp                  # 端口在不在监听（新工具，netstat 的替身）
curl -I http://localhost  # 服务有没有响应</pre>
<p>经典场景题："用户说网站打不开，你怎么查？"——按<b>链路顺序</b>答：ping 通吗 → 端口监听吗 → 服务进程活着吗 → 日志报什么错。有条理比背命令加分。</p>
<h3>文本三剑客（入门够用版）</h3>
<pre>grep -i error app.log     # 在日志里找错误（-i 忽略大小写）
grep -c error app.log     # 数一下错了多少次
cat access.log | awk '{print $1}' | sort | uniq -c | sort -rn | head
# 统计访问最多的前 10 个 IP —— 面试真爱考这条管道</pre>
` },
  {
    id: "python-6weeks",
    title: "Python 六周路线复盘：哪些值得，哪些浪费了",
    date: "2026-08-18",
    tag: "Python",
    tagClass: "t-python",
    summary: "六周 Python 学习的真实复盘：语法学多快都行，真正拉开差距的是'写给自己用的小工具'。附我实际写过的三个脚本。"
, content: `
<p>按六周路线走完一轮，最大的感受：<b>Python 语法是最不值钱的部分，写工具解决问题的能力才值钱。</b></p>
<h3>值得的部分</h3>
<ul>
  <li><b>第 1 周只学最小语法集</b>：变量、判断、循环、函数、列表字典，够用就停，不碰装饰器、元类这些"面试造火箭"内容；</li>
  <li><b>第 2 周直接上手文件操作</b>——因为我的目标场景就是批量处理文件；</li>
  <li><b>第 3-6 周全是"自用工具"驱动</b>：每个脚本都解决我自己的真实痛点。</li>
</ul>
<h3>我实际写过的三个小脚本</h3>
<pre># 1. 批量重命名：把简历文件夹里的「新建文件夹(x)」清理干净
import os, re
for f in os.listdir('.'):
    if re.match(r'新建文件夹', f):
        os.rename(f, f.replace('新建文件夹', '笔记'))

# 2. 日志关键词统计：数一下错误出现了多少次
with open('app.log', encoding='utf-8') as fp:
    text = fp.read()
print('error 出现:', text.lower().count('error'), '次')

# 3. Excel 批量汇总：把 12 个月报表合并成一个文件
import glob
import openpyxl
wb = openpyxl.Workbook()
for path in sorted(glob.glob('2026-*.xlsx')):
    ws = wb.create_sheet(path[:-5])
    src = openpyxl.load_workbook(path).active
    for row in src.iter_rows(values_only=True):
        ws.append(row)</pre>
<h3>浪费的部分（希望你避开）</h3>
<ul>
  <li><b>教程囤积</b>：收藏了 20 个"Python 从入门到精通"，看完的只有 1 个。选定一条路线就走到底；</li>
  <li><b>追求"学会"再动手</b>：正确顺序是反过来的——先动手，卡住了再查。报错信息是最好的老师；</li>
  <li><b>忽视虚拟环境</b>：一开始全局装包，把环境搞乱重装了一次系统级依赖。现在每个项目第一件事 <code class="inline">python -m venv .venv</code>。</li>
</ul>
<h3>下一步</h3>
<p>方向定为运维自动化：subprocess 调系统命令 + schedule 定时跑 + 邮件通知，目标是做出一个"每天自动检查磁盘并汇报"的巡检脚本——这会是我简历上的第一个正式 Python 项目。</p>
` },
  {
    id: "ai-agents",
    title: "本地部署 AI Agent 踩坑记：Claude Code / Codex / Hermes",
    date: "2026-08-12",
    tag: "AI 工具",
    tagClass: "t-ai",
    summary: "从装不上到接入飞书微信全自动跑通，记录我部署终端 AI 代理的完整踩坑过程——这些坑后来全成了面试素材。"
, content: `
<p>这段经历是我简历上最亮眼的部分：独立部署 Claude Code、Codex 等终端 AI 代理，并把 Hermes 接入飞书和微信实现消息自动化。看起来一行话，实际踩了两个星期的坑。</p>
<h3>坑 1：Node 版本地狱</h3>
<p>最先撞上的是版本问题。Claude Code 需要较新的 Node，而机器上是老版本。解决方案：</p>
<pre># 用 nvm 管理多版本，不污染系统环境
nvm install 22
nvm use 22
node -v   # 确认切换成功</pre>
<p>教训：装任何依赖前先看官方文档的<b>版本要求</b>，比报错后瞎搜快一小时。</p>
<h3>坑 2：API Key 与网络配置</h3>
<ul>
  <li>Key 放哪：不要写死在脚本里，用环境变量 <code class="inline">export API_KEY=xxx</code> 或 .env 文件 + .gitignore；</li>
  <li>代理配置：终端工具不一定读系统代理，要单独设置 HTTP_PROXY / HTTPS_PROXY；</li>
  <li>验证连通：先 curl 一下 API 端点，确认网络通再去查程序问题——"分层排查"的思维就是这时候练出来的。</li>
</ul>
<h3>坑 3：Hermes 接入飞书 / 微信</h3>
<p>核心是<b>消息回调</b>：机器人收到消息 → 转给 Hermes 处理 → 结果推回群。卡我最久的是飞书开放平台的事件订阅验证（要原样 echo challenge），看懂文档的加密逻辑后半小时解决。</p>
<blockquote>这次经历让我真正理解了"读官方文档"是硬技能——报错搜中文博客越搜越乱，回到英文原始文档反而 10 分钟定位。</blockquote>
<h3>面试话术沉淀</h3>
<p>面试官问"你做过什么项目"，我的回答结构：</p>
<ol>
  <li><b>背景</b>：想自动化处理群消息里的重复问题；</li>
  <li><b>方案</b>：本地部署 Hermes，通过 webhook 对接飞书；</li>
  <li><b>难点</b>：版本依赖、网络代理、事件订阅验证；</li>
  <li><b>结果</b>：常见问题自动应答，信息处理效率明显提升。</ol>
<p>四步讲完，有背景有细节有结果——比"我学过 AI 工具"有说服力得多。</p>
` },
  {
    id: "mysql-interview",
    title: "MySQL 面试够用版：考点速记",
    date: "2026-08-06",
    tag: "MySQL",
    tagClass: "t-mysql",
    summary: "两周速成 MySQL 的考点浓缩：SQL 四件套、索引为什么快、事务 ACID、MyISAM 与 InnoDB 的区别——每条都是面试原题。"
, content: `
<p>目标明确：不是当 DBA，是面试够用 + 日常会用。两个星期，我只啃这几块。</p>
<h3>一、SQL 四件套必须肌肉记忆</h3>
<pre>SELECT name, salary FROM emp
WHERE dept = '运维部'
ORDER BY salary DESC
LIMIT 5;                    -- 部门工资前 5

INSERT INTO emp (name, dept) VALUES ('piggy', '运维部');

UPDATE emp SET salary = salary * 1.1 WHERE id = 7;

DELETE FROM emp WHERE id = 7;   -- 删前先用 SELECT 确认范围！</pre>
<p>聚合与分组是笔试必考：</p>
<pre>SELECT dept, COUNT(*) AS cnt, AVG(salary) AS avg_sal
FROM emp
GROUP BY dept
HAVING cnt > 3;             -- WHERE 在分组前过滤，HAVING 在分组后过滤</pre>
<h3>二、索引：面试出现率 90%</h3>
<ul>
  <li><b>是什么</b>：排好序的数据结构（InnoDB 用 B+ 树），把全表扫描变成树查找；</li>
  <li><b>为什么快</b>：百万行数据全表扫是百万次，B+ 树只要 3-4 次磁盘 IO；</li>
  <li><b>代价</b>：占空间、拖慢写入（每次增删改都要维护树）；</li>
  <li><b>失效场景</b>：对索引列用函数、隐式类型转换、LIKE '%xx' 左模糊、OR 连接非索引列。</li>
</ul>
<h3>三、事务 ACID：一句话 + 展开各一句</h3>
<ul>
  <li><b>A 原子性</b>：要么全成功要么全回滚（转账扣款和到账必须绑一起）；</li>
  <li><b>C 一致性</b>：事务前后数据总量守恒（钱不会多也不会少）；</li>
  <li><b>I 隔离性</b>：并发事务互不干扰（脏读、不可重复读、幻读就是隔离级别的由来）；</li>
  <li><b>D 持久性</b>：提交即落盘，断电不丢。</li>
</ul>
<h3>四、MyISAM vs InnoDB：答三点即可</h3>
<ul>
  <li>事务：InnoDB 支持，MyISAM 不支持；</li>
  <li>锁：InnoDB 行级锁（并发好），MyISAM 表级锁；</li>
  <li>外键：只有 InnoDB 支持。MySQL 5.5 之后默认引擎就是 InnoDB。</li>
</ul>
<blockquote>备考心得：MySQL 部分按"SQL 手写 → 原理口述"两层准备，手写练 LIMIT/GROUP BY/多表 JOIN，原理只背高频四件：索引、事务、引擎区别、隔离级别。够用了。</blockquote>
` },
  {
    id: "obsidian-kb",
    title: "用 Obsidian 搭一套自己的知识库",
    date: "2026-07-30",
    tag: "效率工具",
    tagClass: "t-tool",
    summary: "学了就忘？我 Obsidian 知识库的三层结构：速记层、主题层、索引层。双链不是花架子，是复习的入口。"
, content: `
<p>转型学习最大的敌人是遗忘。笔记软件换了一圈，最后稳定在 Obsidian，核心原因：<b>本地 Markdown 文件，永不被平台绑架</b>。</p>
<h3>我的三层结构</h3>
<ul>
  <li><b>速记层（Inbox）</b>：学习中随手记，格式不管，先记下来再说，每天晚上花 10 分钟清空；</li>
  <li><b>主题层（Notes）</b>：按 Linux / Python / MySQL / 面试 四个目录归档，一篇笔记只讲一个主题；</li>
  <li><b>索引层（MOC）</b>：每个主题一篇目录页，用双链把散落的笔记串起来。</li>
</ul>
<h3>双链的正确用法</h3>
<p>一开始我以为 [[链接]] 只是好看，后来发现它真正的价值：<b>复习从任意入口进去，都能被链接带出一张网</b>。比如《kill -15 vs -9》这篇笔记链向《信号机制》，再链向《进程状态》——面试前我顺着链接刷一遍，比从头翻笔记快得多。</p>
<h3>模板 + 命名规范</h3>
<pre># 笔记模板
## 一句话结论
## 使用场景
## 示例 / 命令
## 关联笔记
- [[xxx]]
## 面试问法</pre>
<p>"面试问法"这一栏是我加的私货：每篇笔记最后强迫自己想一个"面试官会怎么问这个问题"，写不出来的说明还没学透。</p>
<blockquote>工具不重要，重要的是形成"记 → 归档 → 链接 → 复习"的闭环。Obsidian 只是把这套闭环做得最顺手的一个。</blockquote>
` }
];
