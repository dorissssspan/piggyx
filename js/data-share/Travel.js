/* Piggy X · 日常分享 / 旅游攻略 */
const TRAVEL_ARTICLES = [
  {
    id: "mysql-interview",
    title: "MySQL 面试够用版：考点速记",
    date: "2026-08-06",
    tag: "旅游",
    tagClass: "t-mysql",
    summary: "两周速成 MySQL 的考点浓缩：SQL 四件套、索引为什么快、事务 ACID、MyISAM 与 InnoDB 的区别——每条都是面试原题。",
    content: `
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
HAVING cnt &gt; 3;             -- WHERE 在分组前过滤，HAVING 在分组后过滤</pre>
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
`
  }
];