// build-fix.js - 安全构建脚本
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔧 开始安全构建流程...');

// 备份原文件
const filesToFix = {
  'src/App.tsx': 'src/App.tsx.backup',
  'src/components/Contact.tsx': 'src/components/Contact.tsx.backup'
};

// 1. 备份
Object.entries(filesToFix).forEach(([original, backup]) => {
  if (fs.existsSync(original)) {
    fs.copyFileSync(original, backup);
    console.log(`✅ 已备份: ${original} -> ${backup}`);
  }
});

try {
  // 2. 创建修复版App.tsx（删除React导入）
  const appContent = fs.readFileSync('src/App.tsx', 'utf8');
  const fixedAppContent = appContent.replace(/import React from 'react';\n/, '');
  fs.writeFileSync('src/App.tsx', fixedAppContent);
  console.log('✅ 已创建修复版 App.tsx');

  // 3. 创建修复版Contact.tsx
  const contactContent = fs.readFileSync('src/components/Contact.tsx', 'utf8');
  const fixedContactContent = contactContent.replace(
    /onError=\{\(e\) => \{[^}]+?\}\}/s,
    `onError={(e) => {
    const target = e.target as HTMLImageElement;
    console.error('二维码加载失败');
    target.style.display = 'none';
    const parent = target.parentElement;
    if (parent) {
      const errorDiv = document.createElement('div');
      errorDiv.className = 'text-center py-4';
      errorDiv.innerHTML = \`
        <div class="text-red-500 mb-2">⚠️ 二维码加载失败</div>
        <div class="text-sm text-gray-500">请检查图片路径</div>
      \`;
      parent.insertBefore(errorDiv, target.nextSibling);
    }
  }}`
  );
  fs.writeFileSync('src/components/Contact.tsx', fixedContactContent);
  console.log('✅ 已创建修复版 Contact.tsx');

  // 4. 执行构建
  console.log('🚀 开始构建...');
  execSync('npm run build', { stdio: 'inherit' });
  console.log('🎉 构建成功！');

  // 5. 恢复原文件
  Object.entries(filesToFix).forEach(([original, backup]) => {
    if (fs.existsSync(backup)) {
      fs.copyFileSync(backup, original);
      fs.unlinkSync(backup);
      console.log(`✅ 已恢复: ${backup} -> ${original}`);
    }
  });

  console.log('📦 dist文件夹已生成，可以部署了！');
  console.log('💡 接下来你可以运行: npm run deploy (如果配置了)');

} catch (error) {
  console.error('❌ 构建过程中出错:', error.message);
  
  // 出错时恢复原文件
  Object.entries(filesToFix).forEach(([original, backup]) => {
    if (fs.existsSync(backup)) {
      fs.copyFileSync(backup, original);
      fs.unlinkSync(backup);
      console.log(`🔙 已恢复原文件: ${original}`);
    }
  });
}