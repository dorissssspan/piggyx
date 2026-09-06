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
];