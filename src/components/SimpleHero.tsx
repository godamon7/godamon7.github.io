import { HERO } from "../data";

export default function SimpleHero() {
  return (
    <div
      style={{
        border: '15px solid red',
        backgroundColor: 'black',
        color: 'white',
        padding: '40px',
        margin: '40px',
        fontSize: '28px',
        fontWeight: 'bold',
        textAlign: 'center'
      }}
    >
      🎉 终极测试：如果看到这个红框，说明渲染成功！<br/>
      我的名字是：<span style={{color: 'yellow'}}>{HERO.name}</span><br/>
      我的职位是：<span style={{color: 'cyan'}}>{HERO.title}</span>
    </div>
  );
}