/* Piggy X · 学习心得聚合入口
 * 文章按 tag 分组存放在 js/data-articles/ 目录下，每个文件对应一个 tag，
 * 此处仅负责合并。HTML 加载顺序必须：所有 data-articles/*.js 先于此文件。
 */
const ARTICLES = [
  ...FRONTEND_ARTICLES,
  ...LINUX_ARTICLES,
  ...PYTHON_ARTICLES,
  ...AI_TOOLS_ARTICLES,
  ...MYSQL_ARTICLES,
  ...EFFICIENCY_ARTICLES
];