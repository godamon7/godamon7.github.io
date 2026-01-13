import { useState } from "react";
import { CONTACT } from "../data";
import { motion } from "framer-motion";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(CONTACT.email.value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1300);
  };

  // 直接使用正确的路径常量，避免拼写错误
  const wechatQrPath = "/my-wechat-qr.jpg";

  return (
    <section id="contact" className="w-full max-w-4xl mx-auto px-4 md:px-0 mb-16 pt-10">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-7 tracking-tight">联系我</h2>
      
      <div className="grid sm:grid-cols-2 gap-7">
        {/* 左侧：微信二维码卡片 */}
        <motion.div
          className="bg-white rounded-xl shadow-lg border border-gray-200 flex flex-col items-center p-6 group relative cursor-pointer hover:shadow-xl transition-shadow"
          whileHover={{ y: -2 }}
        >
          {/* 二维码图片 - 使用修正后的路径 */}
          <div className="w-32 h-32 mb-4 flex items-center justify-center rounded-lg border-2 border-blue-100 bg-white p-2">
            <img 
              src={wechatQrPath}
              alt="微信二维码"
              className="w-full h-full object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                console.error(`二维码加载失败，请检查路径: ${wechatQrPath}`);
                target.style.display = 'none';
                // 显示友好的错误提示
                const placeholder = document.createElement('div');
                placeholder.className = 'w-full h-full flex flex-col items-center justify-center';
                placeholder.innerHTML = `
                  <div class="text-3xl mb-2">📱</div>
                  <div class="text-xs text-gray-500 text-center">请添加微信<br/>damon@echargingcn.com</div>
                `;
                target.parentNode?.insertBefore(placeholder, target.nextSibling);
              }}
            />
          </div>
          <span className="text-lg font-medium text-gray-800 mb-1">{CONTACT.wechat.label}</span>
          <span className="text-sm text-blue-600">{CONTACT.wechat.tip}</span>
          <span className="absolute inset-0 group-hover:bg-blue-50/30 transition pointer-events-none rounded-xl" />
        </motion.div>

        {/* 右侧：邮箱 + LinkedIn */}
        <div className="flex flex-col gap-4">
          {/* 邮箱卡片 */}
          <motion.div
            className="bg-white rounded-xl shadow-lg border border-gray-200 p-5 flex items-center group hover:shadow-xl transition-shadow cursor-pointer"
            whileHover={{ y: -2 }}
            onClick={handleCopy}
          >
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
              <span className="text-lg text-blue-600">✉️</span>
            </div>
            <div className="flex flex-col flex-1">
              <span className="text-base font-medium text-gray-800">{CONTACT.email.label}</span>
              <span className="text-sm text-gray-600 mt-1">{CONTACT.email.value}</span>
            </div>
            <span
              className={`ml-4 px-4 py-2 rounded-lg text-sm font-medium transition ${
                copied
                  ? "bg-green-100 text-green-700 border border-green-200"
                  : "bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-100"
              }`}
            >
              {copied ? "已复制" : "复制"}
            </span>
          </motion.div>

          {/* LinkedIn 卡片 */}
          <motion.a
            href={CONTACT.linkedin.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-xl shadow-lg border border-gray-200 p-5 flex items-center group hover:shadow-xl transition-shadow"
            whileHover={{ y: -2 }}
          >
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mr-4">
              <svg className="w-5 h-5 text-blue-700" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.27c-.97 0-1.75-.79-1.75-1.76 0-.97.78-1.76 1.75-1.76s1.75.79 1.75 1.76c0 .97-.78 1.76-1.75 1.76zm15.5 11.27h-3v-5.6c0-1.34-.03-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.97v5.69h-3v-10h2.87v1.37h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.58v5.61z"/>
              </svg>
            </div>
            <div className="flex flex-col flex-1">
              <span className="text-base font-medium text-gray-800">{CONTACT.linkedin.label}</span>
              <span className="text-sm text-gray-600 mt-1">{CONTACT.linkedin.display}</span>
            </div>
            <span className="ml-4 px-4 py-2 rounded-lg text-sm font-medium bg-gray-50 text-gray-700 border border-gray-200 group-hover:bg-gray-100 transition">
              访问
            </span>
          </motion.a>
        </div>
      </div>
    </section>
  );
}