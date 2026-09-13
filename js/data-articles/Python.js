/* Piggy X · Python 学习心得 */
const PYTHON_ARTICLES = [
  {
    id: "python-6weeks",
    title: "Python 六周路线复盘：哪些值得，哪些浪费了",
    date: "2026-08-18",
    tag: "Python",
    tagClass: "t-python",
    summary: "六周 Python 学习的真实复盘：语法学多快都行，真正拉开差距的是'写给自己用的小工具'。附我实际写过的三个脚本。",
    content: `
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
`
  }
,
  {
    id: "python-basics",
    title: "基本语法",
    date: "2026-09-07",
    tag: "Python",
    tagClass: "t-python",
    summary: "变量name=&quot;doris&quot;#字符串用引号age=27#数字不用引号height=1.58#小数pr……",
    content: `
<h3>变量</h3>
<pre><code class="language-python">name = &quot;doris&quot;      # 字符串用引号
age = 27            # 数字不用引号
height = 1.58       # 小数
print(name, age, height)
</code></pre>
<p><strong>跟 SQL 最大的区别</strong>：SQL 建表要先把类型定死（VARCHAR/INT），Python <strong>不用声明类型</strong>，直接赋值就完事——这就是面试考点"<strong>Python 是动态类型语言</strong>"。</p>
<p>值才有类型，变量名只是贴在值上的标签：</p>
<pre><code class="language-python">a = 1
b = a     # 不是复制，是把 a 的标签又贴了一张给 1
a = 2     # a 换贴到 2 上
print(b)  # 猜猜是多少？ → 1，b 还指着原来的 1
</code></pre>
<h3>数据类型</h3>
<table>
<thead>
<tr>
<th>类型</th>
<th>写法</th>
<th>例子</th>
</tr>
</thead>
<tbody>
<tr>
<td>int  整数</td>
<td>直接写</td>
<td>100</td>
</tr>
<tr>
<td>float   小数</td>
<td>直接写</td>
<td>3.14</td>
</tr>
<tr>
<td>str  字符串</td>
<td>引号包</td>
<td>“你好”、'hi'</td>
</tr>
<tr>
<td>bool  布尔</td>
<td>大写开头</td>
<td>True / False</td>
</tr>
<tr>
<td>list   列表</td>
<td>方括号</td>
<td>["一班","二班“,”三班“]</td>
</tr>
<tr>
<td>dict  字典</td>
<td>花括号，键值对</td>
<td>{"name":"小明",”score“:95}</td>
</tr>
</tbody>
</table>
<p>不确定类型就查: <code>type(100)</code> → <code>&lt;class 'int'&gt;</code></p>
<h4>print的必杀技：f-string</h4>
<pre><code class="language-python">name = &quot;doris&quot;
age = 27
print(f&quot;我叫{name}，今年{age}岁&quot;)
# 输出：我叫doris，今年27岁
</code></pre>
<p><strong>记忆钩子</strong>：f-string = 字符串里插变量，<code>f</code> 开头 + 花括号包变量，不用再拿 <code>+</code> 拼接了。</p>
<h4>if判断 + for循环</h4>
<pre><code class="language-python">score = 85
if score &gt;= 90:        # ① 条件后要有冒号
    print(&quot;优秀&quot;)      # ② 缩进 = 代码块（Python 没有 {}）
elif score &gt;= 60:      # ③ elif = 否则如果
    print(&quot;及格&quot;)
else:
    print(&quot;不及格&quot;)
</code></pre>
<ul>
<li>Python 用<strong>换行+缩进</strong>表示代码块，不是 <code>{}</code>（C/Java 才是一行塞完）</li>
<li>钩子：<strong>"Python 的代码块是'排队站好'，不允许'挤成一团'"</strong></li>
<li>报错长这样 = 回想三铁律：冒号 ✅ 缩进 ✅ 分行 ✅</li>
</ul>
<h5>and / or / not</h5>
<table>
<thead>
<tr>
<th>sql</th>
<th>Python</th>
</tr>
</thead>
<tbody>
<tr>
<td>where age&gt;18 AND score&gt;60</td>
<td>if age&gt;18 and score&gt;60:</td>
</tr>
<tr>
<td>where class='一班' OR class='三班'</td>
<td>if cls=='一班' or cls=='三班':</td>
</tr>
<tr>
<td>where not ...</td>
<td>if not ...:</td>
</tr>
</tbody>
</table>
<p>💡面试考点：sql 的 <code>AND</code> 大写，Python 的 <code>and</code> 小写。语法不同，逻辑一模一样。还记得 sql里"<strong>AND 优先于 OR 要加括号</strong>"吗？Python 也一样，混用就 <code>(A or B) and C</code>。</p>
<h5>嵌套if —— if里面在套if：</h5>
<pre><code class="language-python">age = 20
score = 95
if age &gt;= 18:                    # 第一层：成年了才往下看
    if score &gt;= 90:              # 第二层：再看成绩
        print(&quot;成年 + 优秀，双达标&quot;)
    else:
        print(&quot;成年了，但成绩一般&quot;)
else:
    print(&quot;未成年&quot;)
</code></pre>
<h4>for循环： break / continue 两个控制键</h4>
<p>for 变量 in 列表/range，<code>range(1,6)</code> = 1~5（含头不含尾）</p>
<p>break = 提前下课（遇到整个循环停掉）</p>
<pre><code class="language-python">for i in range(1, 11):    # 1~10
    if i == 5:
        print(&quot;到 5 了，收工！&quot;)
        break             # 循环直接结束，6~10 不跑了
    print(i)              # 输出：1 2 3 4
</code></pre>
<p>continue = 跳过这个人（只是跳过当前这次，循环继续）</p>
<pre><code class="language-python">for i in range(1, 6):     # 1~5
    if i == 3:
        continue          # 3 被跳过，不打印
    print(i)              # 输出：1 2 4 5
</code></pre>
<table>
<thead>
<tr>
<th></th>
<th>break</th>
<th>continue</th>
</tr>
</thead>
<tbody>
<tr>
<td>作用</td>
<td>终止 整个循环</td>
<td>跳过 本次，进下一次</td>
</tr>
<tr>
<td>类比</td>
<td>点名点到5直接下课</td>
<td>3号请假，继续点4</td>
</tr>
<tr>
<td>sql类比</td>
<td>接近 LIMIT（截断）</td>
<td>接近 where过滤</td>
</tr>
</tbody>
</table>
<h5>range能加步长 —— 第三参数：</h5>
<pre><code class="language-python">for i in range(1, 10, 2):   # 从1到9，每次+2
    print(i)                # 输出：1 3 5 7 9（奇数）
</code></pre>
<p>口诀：<strong>range(起点, 终点, 步长)，终点永远不含</strong>。</p>
<h3>文件读写 + JSON</h3>
<h5>文件读写：open()</h5>
<p>函数：<code>open(文件名, 模式)</code></p>
<table>
<thead>
<tr>
<th>模式</th>
<th>干什么</th>
<th>sql类比</th>
</tr>
</thead>
<tbody>
<tr>
<td>"r"</td>
<td>读（默认）</td>
<td>select</td>
</tr>
<tr>
<td>“w”</td>
<td>写（覆盖，文件没了就新建）</td>
<td>insert + 清空表</td>
</tr>
<tr>
<td>“a”</td>
<td>追加（在末尾加）</td>
<td>insert 不动老数据</td>
</tr>
</tbody>
</table>
<pre><code class="language-python"># 读文件
with open(&quot;data.txt&quot;, &quot;r&quot;, encoding=&quot;utf-8&quot;) as f:
    content = f.read()
print(content)
# 写文件
with open(&quot;out.txt&quot;, &quot;w&quot;, encoding=&quot;utf-8&quot;) as f:
    f.write(&quot;第一行\\n&quot;)
    f.write(&quot;第二行\\n&quot;)   # \\n = 换行
</code></pre>
<p><strong>💡 必考考点：<code>with</code> 是啥？</strong> —— 自动关门器！<code>with open(...) as f:</code> 块跑完，Python <strong>自动帮你关闭文件</strong>。不用 with 的写法要手动 <code>f.close()</code>，忘了关 = 文件被占用/数据没写进去。钩子：<strong>"with = 出门自动锁门，不 with = 出门忘锁门"</strong></p>
<p><strong>💡 encoding="utf-8" 必带</strong> —— 你 SQL 里学过 utf8mb4 中文不乱码，Python 一样！不写 utf-8，读中文文件直接报错或乱码。</p>
<h5>JSON：程序间的“普通话”</h5>
<pre><code class="language-json">{&quot;name&quot;: &quot;小明&quot;, &quot;age&quot;: 18, &quot;scores&quot;: [85, 92]}
</code></pre>
<p>python ↔ json 互转四个函数（面试爱考）</p>
<table>
<thead>
<tr>
<th>函数</th>
<th>方向</th>
<th>记法</th>
</tr>
</thead>
<tbody>
<tr>
<td>json.dumps(字典)</td>
<td>python → json字符串</td>
<td>dumps 带s = string</td>
</tr>
<tr>
<td>json.loads（字符串）</td>
<td>json字符串 → python字典</td>
<td>loads 带s = string</td>
</tr>
<tr>
<td>json.dump（字典，文件）</td>
<td>python → 写进文件</td>
<td>不带s = 对接文件</td>
</tr>
<tr>
<td>json.load（文件）</td>
<td>从文件读 → python字典</td>
<td>不带s = 对接文件</td>
</tr>
</tbody>
</table>
<p>记忆：带s的是“字符串之间倒腾”，不带s的是“跟文件打交道”</p>
<p>读写文件</p>
<pre><code class="language-python">import json

# 写：把字典存成 json 文件
data = {&quot;name&quot;: &quot;小明&quot;, &quot;age&quot;: 18}
with open(&quot;stu.json&quot;, &quot;w&quot;, encoding=&quot;utf-8&quot;) as f:
    json.dump(data, f, ensure_ascii=False)   # ensure_ascii=False 才能存中文！

# 读：把 json 文件读回字典
with open(&quot;stu.json&quot;, &quot;r&quot;, encoding=&quot;utf-8&quot;) as f:
    back = json.load(f)
print(back[&quot;name&quot;])     # 小明
</code></pre>
<p><strong>ensure_ascii=False 是中文大坑</strong>——不写它，中文会变成 <code>\\u5c0f\\u660e</code> 天书。</p>`
  },
  {
    id: "python-spider",
    title: "爬虫入门（requests + beautifulsoup）",
    date: "2026-09-07",
    tag: "Python",
    tagClass: "t-python",
    summary: "你会学到：requests库——用Python发HTTP请求拿网页（类比：你在浏览器输入网址回车，requests帮你程……",
    content: `
<p><strong>你会学到</strong>：</p>
<ol>
<li><code>requests</code> 库——用 Python 发 HTTP 请求拿网页（类比：你在浏览器输入网址回车，requests 帮你程序化干这事）</li>
<li><code>BeautifulSoup</code>——把网页 HTML 拆开、提取你要的内容（类比：SQL 里 SELECT 你要的列）</li>
<li>实战：抓个网页的标题/列表下来存成 JSON——正好用上今天学的文件读写！</li>
</ol>
<blockquote>
<p>⚠️ 预告：装库要 pip，你系统 Python 是外部管理的，会撞上 <code>externally-managed-environment</code> 报错——到时候教你用 <code>--break-system-packages</code> 解锁，顺便讲讲 pip</p>
</blockquote>
<p>第一步：requests  拿网页</p>
<pre><code class="language-python">import requests

r = requests.get(&quot;https://httpbin.org/html&quot;)   # 请求网页
print(r.status_code)     # 200 = 成功（你学过 HTTP 状态码！404=找不到）
print(r.text)            # 网页源码（HTML 文本）
</code></pre>
<p>💡 面试考点：<code>r.status_code</code> = HTTP 状态码，200 成功 / 404 页面不存在 / 403 禁止访问（反爬最常见）。你 Linux 课学过 curl，requests 就是 Python 版 curl。</p>
<p>第二步：Beautifulsoup 挑内容</p>
<pre><code class="language-python">from bs4 import BeautifulSoup

# 把 HTML 交给 BeautifulSoup 解析
soup = BeautifulSoup(r.text, &quot;html.parser&quot;)

# 找第一个 h1 标签的文字
h1 = soup.find(&quot;h1&quot;)
print(h1.text)          # .text = 只要文字，不要标签
</code></pre>
<p><code>soup.find("h1")</code> = 找<strong>第一个</strong> h1；类比 SQL：<code>SELECT ... LIMIT 1</code></p>
<p>完整爬取《白鲸记》小说正文</p>
<pre><code class="language-python">import requests
from bs4 import BeautifulSoup

r = requests.get(&quot;https://httpbin.org/html&quot;)
print(&quot;状态码:&quot;, r.status_code)

soup = BeautifulSoup(r.text, &quot;html.parser&quot;)
h1 = soup.find(&quot;h1&quot;)
print(&quot;标题:&quot;, h1.text)
p = soup.find(&quot;p&quot;)
print(&quot;正文:&quot;, p.text[:100])    # 正文太长，只打前 100 字符
</code></pre>
<h5>find_all —— 抓"一堆"而不是“一个”</h5>
<p><code>find("h1")</code>只抓第一个；<code>find_all(“p”)</code>抓所有p标签，返回一个列表。</p>
<pre><code class="language-python">import requests
from bs4 import BeautifulSoup

r = requests.get(&quot;https://httpbin.org/html&quot;)
soup = BeautifulSoup(r.text, &quot;html.parser&quot;)

ps = soup.find_all(&quot;p&quot;)          # 所有 &lt;p&gt; 段落 → 列表
print(&quot;一共抓到&quot;, len(ps), &quot;个段落&quot;)   # len() = 数个数（SQL 的 COUNT）

for i, p in enumerate(ps):       # enumerate = 带编号遍历（i 从 0 开始）
    print(f&quot;第{i+1}段:&quot;, p.text[:50])   # 每段只打前 50 字,f=格式化(没f会直接输出{}内的文字)
</code></pre>
<p>💡 面试考点：<code>for i, p in enumerate(列表)</code> = 遍历时<strong>同时拿序号和元素</strong>，比 <code>for p in 列表</code> 多一个计数器。<code>enumerate</code> 从 0 开始，所以显示用 <code>i+1</code>。</p>
<p>钩子：<strong>find 找对象，find_all 找全班，enumerate 是点名册（带学号）</strong> 😎</p>
<h5>实战练习：爬取10条名言+作者，存JSON</h5>
<p><strong>新知识点：find_all 按 class 筛选</strong>，<code>soup.find_all("span", class_="text")</code></p>
<p>⚠️ <strong>大坑</strong>：是 <code>class_</code>（带下划线）！因为 <code>class</code> 是 Python 关键字（你学过的 class 概念），不能直接当参数名。</p>
<pre><code class="language-python">import requests
from bs4 import BeautifulSoup
import json

# 1. 拿网页
r = requests.get(&quot;https://quotes.toscrape.com/&quot;)
soup = BeautifulSoup(r.text, &quot;html.parser&quot;)

# 2. 抓名言 + 作者（各 10 个）
quotes = soup.find_all(&quot;span&quot;, class_=&quot;text&quot;)
authors = soup.find_all(&quot;small&quot;, class_=&quot;author&quot;)
print(&quot;抓到名言:&quot;, len(quotes), &quot;条&quot;)

# 3. 组装成 list[dict]（SQL 的&quot;表&quot;结构！）
data = []
for q, a in zip(quotes, authors):      # zip = 拉链：两条列表一一配对，名言1和作者1索引配对
    data.append({&quot;名言&quot;: q.text, &quot;作者&quot;: a.text})

# 4. 存 JSON 文件（昨天学的！）
with open(&quot;quotes.json&quot;, &quot;w&quot;, encoding=&quot;utf-8&quot;) as f:
    json.dump(data, f, ensure_ascii=False, indent=2)  #indent=2，每个层级缩进 2 空格

print(&quot;已存&quot;, len(data), &quot;条到 quotes.json&quot;)

#输出
抓到名言: 10 条
已存 10 条到 quotes.json
</code></pre>
<p>钩子：<strong>不加 indent = 机器读的压缩包，加了 indent = 人读的排好版的表格</strong>。</p>
<h3>pandas数据分析</h3>
<ol>
<li>pandas = python最主流的数据分析库，表格分析。</li>
<li>DateFrame = 一张SQL表，行 = 记录，列 = 字段（带列名）</li>
</ol>
<p>我已给你建好练习数据 <code>~/python-practice/scores.csv</code>——10 个学生：学号/姓名/班级/语文/数学/英语。</p>
<pre><code class="language-python">import pandas as pd            # 导入库，起外号 pd（全行业习惯）
df = pd.read_csv('scores.csv') # 读 CSV → DataFrame
print(df)
</code></pre>
<table>
<thead>
<tr>
<th>命令</th>
<th>作用</th>
</tr>
</thead>
<tbody>
<tr>
<td>df.head()</td>
<td>前5行</td>
</tr>
<tr>
<td>df.shape</td>
<td>（行数，列数）</td>
</tr>
<tr>
<td>df.columns</td>
<td>列名清单</td>
</tr>
<tr>
<td>df.dtypes</td>
<td>每列类型</td>
</tr>
<tr>
<td>df.describe()</td>
<td>数值统计</td>
</tr>
</tbody>
</table>
<p>跑一下 <code>df.shape</code> 应该看到 <code>(10, 6)</code>。重点看 <code>df.dtypes</code>：<strong>CSV 进来全是文本，数字列被 pandas 自动认成 int64</strong>——SQL 里你建表定类型，这里 pandas 替你干了。</p>
<h5>取列/筛选/排序 = df[] / df[df['xx'] == 'yy'] / df.sort_values()</h5>
<pre><code class="language-python">df['语文']                      # 单列 → Series
#输出  
0    92
1    85
df[['语文','数学']]             # 多列 → DataFrame
#输出
  语文  数学
0  80   92
1  96   85
</code></pre>
<p><strong>面试坑：单中括号=一列，双中括号=多列</strong>。钩子：双中括号=先装一筐列名再整筐取。</p>
<pre><code class="language-python">df[df['班级'] == '一班']      # WHERE 班级='一班'，只要姓名和语文可以在后面加[['姓名',‘语文’]]
#输出
    学号  姓名  班级  语文  数学  英语
0   S01  张伟   一班  92   88   75
1   S02  李娜   一班  85   95   90
df[(df['语文']&gt;=90) &amp; (df['数学']&gt;=90)]       # AND 两科都≥90
#输出
    学号  姓名  班级  语文  数学  英语
4   S05  刘洋  二班   95   92   88
</code></pre>
<p>套路：<code>df[条件]</code>，条件为 True 的行留下。<strong>&amp; = AND、| = OR</strong>（不能用 and/or！），每个条件单独加括号——SQL 里 AND 优先级踩过坑，Python 里漏括号直接报错。</p>
<pre><code class="language-python">df['总分'] = df['语文'] + df['数学'] + df['英语']   # 加列逐行算
df.sort_values('总分', ascending=False)[['姓名','班级','总分']].head(3)       
# ORDER BY 总分 DESC, head()输出前几
#输出
   姓名  班级   总分
4  刘洋  二班   275
9  孙悦  三班   272
1  李娜  一班   270
</code></pre>
<h5>groupby 分组统计 + merge表拼接</h5>
<p>groupby = GROUP BY</p>
<pre><code class="language-python"># sql = sselect 班级, AVG（语文） from scores group by 班级
# python
df.groupby('班级')[['语文','数学','英语']].mean().round(1)
</code></pre>
<p>拆解四步：<strong>按班级分堆 → 挑出数值列 → 每堆求平均 → round(1) 留 1 位小数</strong></p>
<h6>聚合函数</h6>
<table>
<thead>
<tr>
<th>pandas</th>
<th>sql</th>
</tr>
</thead>
<tbody>
<tr>
<td>.mean()</td>
<td>AVG</td>
</tr>
<tr>
<td>.sum()</td>
<td>SUM</td>
</tr>
<tr>
<td>.count()</td>
<td>COUNT</td>
</tr>
<tr>
<td>.max() / .min()</td>
<td>MAX / MIN</td>
</tr>
</tbody>
</table>
<p>一班语文：<code>(92+85+78+88)/4 = 85.75 → 85.8</code>  ✓（预跑：一班85.8/三班83.3/二班81.3）</p>
<p>⚠️ 输出里两个坑:</p>
<ul>
<li>
<p>班级顺序是一班→三班→二班，不是一二三——groupby 默认<strong>按键排序</strong>，中文按 Unicode 码点排。跟你 SQL 学的"没 ORDER BY 别赌顺序"一个道理</p>
</li>
<li>
<p><strong>"班级"变成了索引</strong>（最左边没表头那列）——想变回普通列：<code>.reset_index()</code>，或 <code>groupby('班级', as_index=False)</code></p>
</li>
</ul>
<h6>merge = JOIN</h6>
<pre><code class="language-python"># SQL：SELECT * FROM scores JOIN teacher ON scores.班级 = teacher.班级
# python
df.merge(df, t, on='班级', how='inner')   #inner join
df.merge(df, t, on='班级', how='left')    #left join
</code></pre>
<table>
<thead>
<tr>
<th>参数</th>
<th>含义</th>
</tr>
</thead>
<tbody>
<tr>
<td>on= '班级'</td>
<td>连接列（两边列名相同；不同名用left_on / right_on)</td>
</tr>
<tr>
<td>how='inner'</td>
<td>交集，两边都对上才算数</td>
</tr>
<tr>
<td>how='left'</td>
<td>左表全留，右表没有补NULL</td>
</tr>
</tbody>
</table>
<p>预跑结果：</p>
<ul>
<li><code>how='inner'</code> → <strong>7 行</strong>：三班 3 人（老师表没三班）被丢；<strong>四班刘老师也没出现</strong>（学生表没四班）</li>
<li><code>how='left'</code> → <strong>10 行</strong>：三班 3 人班主任 = <code>NaN</code>（NULL 补位）</li>
<li>找孤儿：<code>m = pd.merge(df, t, on='班级', how='left')</code> 然后 <code>m[m['班主任'].isna()]</code> → 周芳/吴涛/孙悦（根据班级找是否匹配老师）</li>
</ul>
<p><strong><code>isna()</code> = IS NULL</strong>，NaN = pandas 的空值。</p>
<p>⚠️ 面试坑：<strong>空值判断必须用 isna()，不能用 <code>==</code></strong>——跟 SQL 里 NULL 不能拿 <code>=</code> 比，一个病根。</p>
<h3>数据清洗</h3>
<h4>删除/填写</h4>
<p><code>dropna()</code>  有缺值就删整行（谨慎）。  <code>fillna（值）</code>  把缺值填上，保留行（安全）。</p>
<p>实用口诀：</p>
<ul>
<li>缺<strong>关键信息</strong>（姓名/ID） →→ 删行( <code>dropna</code> )</li>
<li>缺普通成绩  →→ 填空值( <code>fillna</code> )，比删行损失小</li>
</ul>
<p><strong>drop_duplicates的两个细节</strong>，删重是“整行一模一样才算重”。</p>
<table>
<thead>
<tr>
<th>drop_duplicates参数</th>
<th>效果</th>
</tr>
</thead>
<tbody>
<tr>
<td>默认 keep = 'first'</td>
<td>重复的留第一个</td>
</tr>
<tr>
<td>keep = 'last'</td>
<td>重复的留最后一个</td>
</tr>
<tr>
<td>keep = False</td>
<td>重复的<strong>全删</strong>（一个不留）</td>
</tr>
<tr>
<td>subset = ['姓名']</td>
<td>只看这列判断重复</td>
</tr>
</tbody>
</table>
<h4>rename + astype （改名 + 改类型）</h4>
<p>真实数据表头常常不规范（中文/空格/大小写），要统一</p>
<p>格式：<code>df.rename(columns={'旧名': '新名', '旧名2': '新名2'}, inplace=True)</code></p>
<p><code>columns={...}</code>改列名（表头），<code>index={...}</code>改行名（行号标签），<code>inplace=Ture</code>直接改原表，不用df=接</p>
<p><code>df['列'] = df['列'].astype(str)</code>    数字→字符串（学号/电话防丢0）</p>
<p><code>df['列'] = df[‘列’].astype(int)</code>    → 整数</p>
<p><code>df['列'] = df['列'].astype(float)</code>   → 小数</p>
<p>⚠️<strong>字符串转数字前先清符号</strong> → <code>'8,000'</code> 要先 .str.replac；</p>
<p>⚠️float→int 是<strong>截断</strong>（没有四舍五入），四舍五入用.round（）;</p>
<p>⚠️有 NaN不能转int，先fillna再转；</p>
<h4>loc / iloc —— 按“标签”还是按“位置”取值</h4>
<table>
<thead>
<tr>
<th style="text-align: center;">方法</th>
<th style="text-align: center;">按什么取</th>
<th style="text-align: center;">记忆钩子</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align: center;">loc[行，列]</td>
<td style="text-align: center;"><strong>标签</strong>（行名/列名）</td>
<td style="text-align: center;">label-based → <strong>loc</strong></td>
</tr>
<tr>
<td style="text-align: center;">iloc[行，列]</td>
<td style="text-align: center;"><strong>位置</strong>（第几行第几列，从0数）</td>
<td style="text-align: center;">integer position → <strong>iloc</strong>（i=整数）</td>
</tr>
</tbody>
</table>
<p>实战清洗</p>
<pre><code class="language-python">import pandas as pd
# 读dirty2.csv
df = pd.read_csv('dirty2.csv')
# 删除完全重复的行 —— 2. 删掉**重复**行（张三出现两次）
df = df.drop_duplicates( subset=['姓名'] )
# 删除“没名字”的行
df = df.dropna( subset=['姓名'])
# 城市空的填“未知”
df['城市'] = df['城市'].fillna('未知')
# 年龄为空的填 平均年龄
mean_age = df['年龄'].mean()
df['年龄'] = df['年龄'].fillna(mean_age)
# 工资为空的填 平均工资
mean_salary = df['工资'].mean()
df['工资'] = df['工资'].fillna(mean_salary)
# 另存为 clean2_out.csv
df.to_csv('clean2_out.csv', index=False)

print(&quot;清洗后的数据：&quot;)
print(df)
</code></pre>
<h3>matplotlib可视化</h3>
<table>
<thead>
<tr>
<th>图形</th>
<th>代码</th>
<th>看什么</th>
</tr>
</thead>
<tbody>
<tr>
<td>折线图</td>
<td>plt.plot(x, y)</td>
<td>趋势（随时间涨跌）</td>
</tr>
<tr>
<td>柱状图</td>
<td>plt.bar（名字， 数字）</td>
<td>对比（谁高谁低）</td>
</tr>
</tbody>
</table>
<p><strong>中文不乱码两行咒语</strong></p>
<pre><code class="language-python">plt.rcParams['font.sans-serif'] = ['WenQuanYi Zen Hei']
plt.rcParams['axes.unicode_minus'] = False    # 第二行治负号&quot;-&quot;变方块
</code></pre>
<p>实例</p>
<pre><code class="language-python">import pandas as pd
import matplotlib.pyplot as plt

plt.rcParams['font.sans-serif'] = ['WenQuanYi Zen Hei']
plt.rcParams['axes.unicode_minus'] = False

df = pd.read_csv('scores.csv')
avg = df.groupby('班级')['语文'].mean().round(1)
print(avg)                    # ① 先 print 确认数字

plt.bar(avg.index, avg.values)   # ② 横轴=班级名，高度=平均分
plt.title('各班语文平均分')        # ③ 装饰三件套
plt.xlabel('班级')
plt.ylabel('分数')
plt.savefig('class_yuwen.png')   # ④ WSL 没屏幕 → 存文件
</code></pre>
<p>折线图——自造一周 7 天数据（比如你每天运动消耗的千卡数，随便编），<code>plt.plot</code> 画趋势，存 <code>week_line.png</code>，标题"一周运动消耗"</p>
<pre><code class="language-python">import matplotlib.pyplot as plt
# 1. 自造一周 7 天数据（单位：千卡）
days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
calories = [280, 320, 300, 450, 480, 520, 400]  # 随便编的数

# 2. 创建折线图
plt.figure(figsize=(10, 5))          # 设置画布大小
plt.plot(days, calories, marker='o', linestyle='-', color='skyblue', linewidth=2, markersize=8)

# 3. 添加标题和标签
plt.title('一周运动消耗', fontsize=16)
plt.xlabel('日期', fontsize=12)
plt.ylabel('消耗 (千卡)', fontsize=12)
plt.grid(True, linestyle='--', alpha=0.6)   # 网格线，更清晰

# 4. 保存图片
plt.savefig('week_line.png', dpi=300, bbox_inches='tight')

# 5. 显示（可选）
plt.show()
</code></pre>
<blockquote>
<p>📷 原笔记插图（matplotlib 生成图：柱状图 class_yuwen.png / 折线图 week_line.png）</p>
</blockquote>`
  }
];
