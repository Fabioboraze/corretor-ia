import OpenAI from 'openai';

export async function POST(req) {
  try {
    const { imovel, tipoSaida } = await req.json();

    if (!imovel || !tipoSaida) {
      return Response.json({ error: 'Dados do imóvel ou tipo de saída ausentes.' }, { status: 400 });
    }

    if (!process.env.OPENAI_API_KEY) {
      return Response.json({ error: 'Defina OPENAI_API_KEY no arquivo .env.local para ativar a geração.' }, { status: 400 });
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const prompt = `Você é o CORRETOR IA, especialista em marketing e vendas imobiliárias no Brasil.

OBJETIVO: transformar dados de um imóvel em conteúdo comercial útil, elegante e específico, sem clichês vazios.

MODO: ${imovel.modo}
TIPO DE SAÍDA: ${tipoSaida}

DADOS DO IMÓVEL:
Nome: ${imovel.nome}
Tipo: ${imovel.tipo}
Bairro: ${imovel.bairro}
Cidade: ${imovel.cidade}
Preço: ${imovel.preco}
Área: ${imovel.area}
Quartos: ${imovel.quartos}
Suítes: ${imovel.suites}
Vagas: ${imovel.vagas}
Público: ${imovel.publico}
Diferenciais: ${imovel.diferenciais}

REGRAS:
- Não invente características não informadas.
- Se faltar informação, trabalhe apenas com o que existe.
- Não crie urgência, escassez, disponibilidade, descontos ou condições comerciais que não tenham sido fornecidos.
- Em alto padrão, use linguagem de patrimônio, experiência, exclusividade, localização e valor percebido; evite “imóvel dos sonhos”.
- Seja comercial sem prometer valorização ou retorno financeiro garantido.
- Não faça segmentação imobiliária com base em raça, religião, gênero, deficiência, origem ou outras características protegidas.
- Escreva em português do Brasil.

Se tipoSaida = campanha, entregue: posicionamento, público, 5 headlines, roteiro de Reels de até 60s, legenda, anúncio Meta, mensagem WhatsApp, sequência de 3 follow-ups, 5 objeções com respostas e CTA final.
Se for outro tipo, entregue apenas a peça solicitada, com alta qualidade e pronta para uso.`;

    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || 'gpt-5.6-luna',
      input: prompt
    });

    return Response.json({ resultado: response.output_text });
  } catch (error) {
    console.error('Erro CORRETOR IA:', error);
    return Response.json({ error: 'Não foi possível gerar o conteúdo agora.' }, { status: 500 });
  }
}
