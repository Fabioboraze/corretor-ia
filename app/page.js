'use client';

import { useState } from 'react';

const initial = {
  nome: '', tipo: 'Apartamento', bairro: '', cidade: '', preco: '', area: '', quartos: '', suites: '', vagas: '', diferenciais: '', publico: '', modo: 'alto-padrao'
};

export default function Home() {
  const [form, setForm] = useState(initial);
  const [tipoSaida, setTipoSaida] = useState('campanha');
  const [resultado, setResultado] = useState('');
  const [loading, setLoading] = useState(false);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function gerar(e) {
    e.preventDefault();
    setLoading(true);
    setResultado('');
    try {
      const r = await fetch('/api/gerar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imovel: form, tipoSaida })
      });
      const data = await r.json();
      setResultado(data.resultado || data.error || 'Não foi possível gerar.');
    } catch {
      setResultado('Erro ao gerar conteúdo. Verifique a configuração da API.');
    } finally {
      setLoading(false);
    }
  }

  const fieldStyle = { padding: 12, borderRadius: 10, border: '1px solid #ccc', width: '100%', boxSizing: 'border-box' };

  return (
    <main style={{ maxWidth: 1100, margin: '0 auto', padding: 24 }}>
      <header style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 1.4 }}>CORRETOR IA — MVP 0.1</div>
        <h1 style={{ fontSize: 42, margin: '8px 0' }}>Transforme um imóvel em uma campanha de vendas.</h1>
        <p style={{ fontSize: 18, color: '#555', maxWidth: 760 }}>Cadastre os dados uma vez e gere roteiro de Reels, anúncio, WhatsApp, follow-up, objeções e campanha completa.</p>
      </header>

      <form onSubmit={gerar} style={{ background: 'white', borderRadius: 18, padding: 22, boxShadow: '0 8px 30px rgba(0,0,0,.06)' }}>
        <h2>Motor do Imóvel</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 14 }}>
          <input name="nome" value={form.nome} onChange={change} placeholder="Nome do imóvel/empreendimento" style={fieldStyle} />
          <select name="tipo" value={form.tipo} onChange={change} style={fieldStyle}><option>Apartamento</option><option>Casa</option><option>Cobertura</option><option>Terreno</option><option>Comercial</option></select>
          <input name="bairro" value={form.bairro} onChange={change} placeholder="Bairro" style={fieldStyle} />
          <input name="cidade" value={form.cidade} onChange={change} placeholder="Cidade" style={fieldStyle} />
          <input name="preco" value={form.preco} onChange={change} placeholder="Preço" style={fieldStyle} />
          <input name="area" value={form.area} onChange={change} placeholder="Área em m²" style={fieldStyle} />
          <input name="quartos" value={form.quartos} onChange={change} placeholder="Quartos" style={fieldStyle} />
          <input name="suites" value={form.suites} onChange={change} placeholder="Suítes" style={fieldStyle} />
          <input name="vagas" value={form.vagas} onChange={change} placeholder="Vagas" style={fieldStyle} />
          <input name="publico" value={form.publico} onChange={change} placeholder="Público desejado" style={fieldStyle} />
        </div>
        <textarea name="diferenciais" value={form.diferenciais} onChange={change} placeholder="Diferenciais: vista, lazer, rooftop, localização, acabamento, condição comercial..." rows={5} style={{ ...fieldStyle, marginTop: 14 }} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 14 }}>
          <select name="modo" value={form.modo} onChange={change} style={fieldStyle}>
            <option value="alto-padrao">Modo Alto Padrão</option>
            <option value="direto">Modo Direto</option>
            <option value="investidor">Modo Investidor</option>
          </select>
          <select value={tipoSaida} onChange={(e)=>setTipoSaida(e.target.value)} style={fieldStyle}>
            <option value="campanha">Campanha completa</option>
            <option value="reels">Roteiro de Reels</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="followup">Follow-up</option>
            <option value="objecoes">Objeções</option>
            <option value="anuncio">Anúncio</option>
          </select>
        </div>

        <button disabled={loading} style={{ marginTop: 18, padding: '14px 22px', borderRadius: 12, border: 0, background: '#111', color: 'white', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>
          {loading ? 'Gerando...' : 'Gerar com IA'}
        </button>
      </form>

      <section style={{ marginTop: 24, background: 'white', borderRadius: 18, padding: 22, minHeight: 220, boxShadow: '0 8px 30px rgba(0,0,0,.06)' }}>
        <h2>Resultado</h2>
        <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', lineHeight: 1.6 }}>{resultado || 'O conteúdo gerado aparecerá aqui.'}</pre>
      </section>
    </main>
  );
}
