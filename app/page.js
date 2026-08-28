'use client';

import { useMemo, useState } from 'react';

const initial = {
  nome: '', tipo: 'Apartamento', bairro: '', cidade: '', preco: '', area: '', quartos: '', suites: '', vagas: '', diferenciais: '', publico: '', modo: 'alto-padrao'
};

const demo = {
  nome: 'Residencial Vista do Mar', tipo: 'Apartamento', bairro: 'Praia da Costa', cidade: 'Vila Velha - ES', preco: 'R$ 3.500.000', area: '196', quartos: '4', suites: '4', vagas: '3', publico: 'Famílias que valorizam localização, conforto e patrimônio', modo: 'alto-padrao',
  diferenciais: 'Vista para o mar, rooftop, duas unidades por andar, acabamento de alto padrão e localização próxima à orla.'
};

const saidas = [
  ['campanha', 'Campanha 360°'], ['reels', 'Roteiro de Reels'], ['whatsapp', 'WhatsApp'], ['followup', 'Follow-up'], ['objecoes', 'Objeções'], ['anuncio', 'Anúncio']
];

export default function Home() {
  const [form, setForm] = useState(initial);
  const [tipoSaida, setTipoSaida] = useState('campanha');
  const [resultado, setResultado] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [copiado, setCopiado] = useState(false);

  const pronto = useMemo(() => Boolean(form.tipo && form.cidade && form.diferenciais.trim()), [form]);
  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function gerar(e) {
    e.preventDefault();
    if (!pronto) {
      setErro('Preencha pelo menos tipo, cidade e diferenciais do imóvel.');
      return;
    }
    setLoading(true); setResultado(''); setErro(''); setCopiado(false);
    try {
      const r = await fetch('/api/gerar', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ imovel: form, tipoSaida }) });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error || 'Falha na geração.');
      setResultado(data.resultado || 'Conteúdo não retornado.');
    } catch (e) {
      setErro(e.message || 'Erro ao gerar conteúdo.');
    } finally { setLoading(false); }
  }

  async function copiar() {
    if (!resultado) return;
    await navigator.clipboard.writeText(resultado);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 1800);
  }

  return (
    <main className="shell">
      <header className="hero">
        <div className="brand"><span className="brandMark">C</span><div><strong>CORRETOR IA</strong><small>Marketing & Vendas Imobiliárias</small></div></div>
        <div className="badge">MVP 0.2</div>
        <h1>Um imóvel. Uma entrada.<br/><span>Todo o conteúdo de vendas.</span></h1>
        <p>Transforme informações reais do imóvel em campanhas, Reels, WhatsApp, follow-ups e argumentos comerciais prontos para usar.</p>
      </header>

      <section className="workspace">
        <form onSubmit={gerar} className="panel formPanel">
          <div className="sectionTitle"><div><small>ETAPA 1</small><h2>Motor do Imóvel</h2></div><button type="button" className="ghost" onClick={() => setForm(demo)}>Preencher exemplo</button></div>

          <div className="grid">
            <label>Imóvel / empreendimento<input name="nome" value={form.nome} onChange={change} placeholder="Ex.: Edifício Atlântico" /></label>
            <label>Tipo<select name="tipo" value={form.tipo} onChange={change}><option>Apartamento</option><option>Casa</option><option>Cobertura</option><option>Terreno</option><option>Comercial</option></select></label>
            <label>Bairro<input name="bairro" value={form.bairro} onChange={change} placeholder="Ex.: Praia da Costa" /></label>
            <label>Cidade *<input name="cidade" value={form.cidade} onChange={change} placeholder="Ex.: Vila Velha - ES" /></label>
            <label>Preço<input name="preco" value={form.preco} onChange={change} placeholder="Ex.: R$ 3.500.000" /></label>
            <label>Área privativa<input name="area" value={form.area} onChange={change} placeholder="m²" inputMode="decimal" /></label>
            <label>Quartos<input name="quartos" value={form.quartos} onChange={change} placeholder="0" inputMode="numeric" /></label>
            <label>Suítes<input name="suites" value={form.suites} onChange={change} placeholder="0" inputMode="numeric" /></label>
            <label>Vagas<input name="vagas" value={form.vagas} onChange={change} placeholder="0" inputMode="numeric" /></label>
            <label>Público desejado<input name="publico" value={form.publico} onChange={change} placeholder="Quem deve se interessar?" /></label>
          </div>

          <label className="wide">Diferenciais e fatos do imóvel *<textarea name="diferenciais" value={form.diferenciais} onChange={change} placeholder="Vista, lazer, rooftop, acabamento, condição comercial, localização... Use somente informações verdadeiras." rows={5} /></label>

          <div className="controls">
            <label>Estilo de comunicação<select name="modo" value={form.modo} onChange={change}><option value="alto-padrao">Alto Padrão</option><option value="direto">Direto</option><option value="investidor">Investidor</option></select></label>
            <label>O que gerar?<select value={tipoSaida} onChange={(e) => setTipoSaida(e.target.value)}>{saidas.map(([v,l]) => <option key={v} value={v}>{l}</option>)}</select></label>
          </div>

          {erro && <div className="error">{erro}</div>}
          <button className="primary" disabled={loading}>{loading ? <><span className="spinner"/>Criando estratégia...</> : 'Gerar com IA →'}</button>
          <p className="guardrail">A IA é instruída a não inventar características, descontos, escassez ou promessa de valorização.</p>
        </form>

        <aside className="panel resultPanel">
          <div className="sectionTitle"><div><small>ETAPA 2</small><h2>Conteúdo gerado</h2></div>{resultado && <button type="button" className="ghost" onClick={copiar}>{copiado ? 'Copiado ✓' : 'Copiar'}</button>}</div>
          {!resultado && !loading && <div className="empty"><div className="spark">✦</div><h3>Pronto para criar</h3><p>Preencha os dados do imóvel e escolha o formato. O resultado aparecerá aqui pronto para adaptar e publicar.</p></div>}
          {loading && <div className="empty"><div className="pulse">✦</div><h3>Analisando o imóvel</h3><p>Organizando diferenciais, posicionamento, linguagem e argumentos comerciais.</p></div>}
          {resultado && <pre>{resultado}</pre>}
        </aside>
      </section>

      <footer>Feito para transformar dados reais em comunicação imobiliária melhor.</footer>
    </main>
  );
}
