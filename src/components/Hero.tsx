import React from "react";
import { HERO } from "../data";

export default function Hero() {
  // 调试日志，确认组件渲染
  console.log("Hero 渲染了，HERO 数据是：", HERO);

  // 防御式判断，防止数据为空
  const name = HERO?.name || "刘政";
  const title = HERO?.title || "新能源充电行业负责人";
  const value = HERO?.value || "深耕新能源充电领域，负责项目落地、资源协调与业务推进，致力于将复杂问题转化为可执行的商业结果。";

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",               // 占满全屏
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0f172a, #1e293b)",
        color: "#fff",
        padding: "0 24px",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: "900px" }}>
        {/* 姓名 */}
        <h1
          style={{
            fontSize: "3rem",
            fontWeight: 600,
            marginBottom: "16px",
            lineHeight: 1.2,
          }}
        >
          {name}
        </h1>

        {/* 职位 */}
        <p
          style={{
            fontSize: "1.5rem",
            marginBottom: "12px",
            opacity: 0.9,
          }}
        >
          {title}
        </p>

        {/* 价值主张 / 简介 */}
        <p
          style={{
            fontSize: "1.1rem",
            lineHeight: 1.7,
            marginBottom: "32px",
            opacity: 0.75,
          }}
        >
          {value}
        </p>

        {/* CTA 按钮 */}
        <a
          href="#achievements"
          style={{
            display: "inline-block",
            padding: "14px 36px",
            backgroundColor: "#10b981",
            color: "#fff",
            textDecoration: "none",
            borderRadius: "8px",
            fontSize: "1rem",
            fontWeight: 500,
          }}
        >
          查看关键成就
        </a>
      </div>
    </section>
  );
}
