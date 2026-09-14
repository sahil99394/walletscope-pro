 "use client";
import {useState} from "react";
const plans=[["Free","₹0","5 wallets","Basic alerts"],["Pro","₹699/mo","50 wallets","Whale alerts + history"],["Business","₹1,999/mo","500 wallets","Team + API access"]];
export default function Home(){
 const [address,setAddress]=useState(""); const [network,setNetwork]=useState("Ethereum"); const [data,setData]=useState(null); const [loading,setLoading]=useState(false); const [err,setErr]=useState("");
 async function track(){setErr("");setLoading(true);try{const r=await fetch("/api/wallet",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({address,network})});const j=await r.json();if(!r.ok)throw Error(j.error);setData(j)}catch(e){setErr(e.message)}finally{setLoading(false)}}
 return <main>
  <nav><b>◈ WalletScope <i>PRO</i></b><div><a href="#dashboard">Dashboard</a><a href="#pricing">Pricing</a><a href="#alerts">Alerts</a><button>Sign in</button></div></nav>
  <header><small>V2 • LIVE WALLET ANALYTICS</small><h1>Track wallets.<br/><span>Catch the whales.</span></h1><p>Live public blockchain balances, transfers and configurable whale alerts. Read-only by design.</p>
   <section className="search"><input value={address} onChange={e=>setAddress(e.target.value)} placeholder="0x wallet address"/><select value={network} onChange={e=>setNetwork(e.target.value)}><option>Ethereum</option><option>Base</option><option>Arbitrum</option><option>Polygon</option><option>BNB Chain</option></select><button onClick={track}>{loading?"Loading…":"Track wallet →"}</button></section>
   <label className="safety">🔒 Never enter a seed phrase or private key.</label>{err&&<div className="error">{err}</div>}
  </header>
  {data&&<section id="dashboard" className="dashboard"><div className="mode">{data.mode==="live"?"● LIVE BLOCKCHAIN DATA":"● DEMO MODE"} <span>{data.network}</span></div>
   <div className="stats"><div><small>WALLET</small><strong>{data.address.slice(0,8)}…{data.address.slice(-6)}</strong></div><div><small>NATIVE BALANCE</small><strong>{data.ethBalance!=null?data.ethBalance.toFixed(4)+" ETH":"4.8200 ETH"}</strong></div><div><small>ASSET COUNT</small><strong>{data.tokenBalances?.length||data.tokens?.length||3}</strong></div><div><small>WHALE ALERTS</small><strong className="red">{data.whaleAlerts?.length||0}</strong></div></div>
   <div className="grid"><div className="card"><h2>Portfolio overview</h2><div className="big">{data.portfolioValue?"$"+data.portfolioValue.toLocaleString():"Live value requires price API"}</div><div className="chart"></div></div>
   <div className="card" id="alerts"><h2>Whale alerts</h2>{(data.whaleAlerts||[]).map((a,i)=><div className="alert" key={i}>🐋 <b>{a.text}</b><span>{a.amount}</span></div>)}{data.mode==="live"&&<p className="muted">Configure a server webhook to push real-time alerts for watched wallets.</p>}</div></div>
   <div className="card"><h2>Recent transfers</h2>{(data.transfers||data.received||[]).slice(0,8).map((t,i)=><div className="tx" key={i}><span>{t.type||"Transfer"}</span><b>{t.asset||t.rawContract?.address?.slice(0,10)||"Token"}</b><span>{t.value??"—"}</span><span>{t.metadata?.blockTimestamp||"recent"}</span></div>)}</div>
  </section>}
  <section className="pricing" id="pricing"><small>PAID PLANS</small><h2>Monetize your tracker.</h2><div className="plans">{plans.map((p,i)=><article className={i===1?"hot":""}><h3>{p[0]}</h3><strong>{p[1]}</strong><p>✓ {p[2]}<br/>✓ {p[3]}<br/>✓ Dashboard access</p><button>Choose plan</button></article>)}</div><p className="note">Payment checkout is intentionally not hard-coded with credentials. Connect your chosen payment processor server-side before accepting money.</p></section>
  <footer><b>◈ WalletScope PRO</b><span>Public-chain analytics only.</span><span>No private keys.</span><span>© 2026</span></footer>
 </main>
}