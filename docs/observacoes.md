# Observações Técnicas e Lições Aprendidas — Critical Bait

## 1. Critério de análise

Os resultados abaixo são relativos à **execução #15**, branch `main`, commit `626d0a2b6bc5c75df4a87457ae7c712256314219`, exceto o teste de bloqueio **#23**. A classificação distingue **achado observado**, **risco residual**, **não ocorrência** e **evidência insuficiente**. Não há comprovação de correções de vulnerabilidades entre execuções; portanto, nenhuma é atribuída sem commit verificável.

## 2. Registro de achados por ferramenta

| Ferramenta | Achado / severidade | Onde | Classificação | Ação ou encaminhamento | Resultado / evidência |
|---|---|---|---|---|---|
| Gitleaks | 0 segredos na #15 | Repositório | Nenhum achado reportado | Manter varredura em cada mudança | #15: sucesso |
| Semgrep | 0 achados; 0 erros | Código-fonte | Nenhum achado reportado | Manter regras e revisão humana | #15: sucesso |
| Trivy SCA | `DS-0026` — LOW: Dockerfile sem `HEALTHCHECK` | `Dockerfile` | Configuração a avaliar; não comprovada como falso positivo | Avaliar `HEALTHCHECK` compatível com Nginx e registrar correção em commit futuro | TXT: 27 testes, 26 aprovados, 1 LOW; JSON: 20 checks, 0 falhas |
| Trivy Container | 1 MEDIUM e 2 UNKNOWN | Pacotes `musl`, `musl-utils`, `zlib` na imagem | Risco residual, sujeito à versão e base de vulnerabilidades | Atualizar imagem-base e reexecutar scan; conferir identificadores/CVEs no TXT original | Resumo #15: 0 HIGH/CRITICAL; diferença entre TXT e JSON |
| OWASP ZAP | `Modern Web Application` — informativo | URL de homologação | Informativo, não comprovado como vulnerabilidade | Registrar como característica da aplicação | 66 PASS, 0 FAIL no baseline |
| OWASP ZAP | `Non-Storable Content` — informativo | Respostas HTTP do staging | Informativo; requer revisão de cache e conteúdo | Avaliar cabeçalhos de cache conforme conteúdo servido | Sem alertas HIGH/MEDIUM/LOW |
| Gitleaks (teste) | 1 possível segredo detectado; regra/valor não identificados | Branch `teste-quality-gate`, workflow `.yaml` desativado | Detecção e bloqueio comprovados nesse workflow | Log preservado, sem expor credenciais | #23: `23 commits scanned`, `leaks found: 1`, `exit code 1`; jobs seguintes `skipped` |

### 2.1 Diferenças entre os relatórios do Trivy

No **SCA**, o TXT descreve 27 verificações e 1 item LOW, enquanto o JSON consultado apresenta 20 verificações e 0 falhas. No **scan de imagem**, o TXT registra achados MEDIUM/UNKNOWN que não aparecem de modo equivalente no JSON. Essas diferenças **não autorizam concluir que um dos formatos está errado** sem comparar comando, versão, opções e escopo de geração. O resumo 0 HIGH/CRITICAL é compatível com a presença de achados menos severos.

### 2.2 Quality gate e teste negativo

A execução #23 demonstra que o workflow `.yaml` (desativado posteriormente) bloqueou as etapas dependentes após o Gitleaks encontrar **1 possível segredo**. O log mostra `23 commits scanned`, `leaks found: 1` e `exit code 1`, mas não revela o valor ou a regra detectada. A execução #15 utilizou o workflow principal `.yml`; por isso, as evidências são apresentadas como testes de configurações distintas. Prints: `evidencias/12-quality-gate-bloqueado.png` e `evidencias/14-gitleaks-run23-log.png`.

## 3. Riscos residuais e prioridades

| Prioridade | Risco / limitação | Recomendação |
|---|---|---|
| Média | Dependências da imagem com achados MEDIUM/UNKNOWN | Verificar CVEs e versões, atualizar base, comparar scan seguinte |
| Baixa | `HEALTHCHECK` ausente no Dockerfile | Adicionar verificação de saúde apropriada e validar comportamento |
| Baixa | Alertas informativos do ZAP | Avaliar política de cache e cabeçalhos HTTP |
| Documental | TXT e JSON não inteiramente equivalentes | Padronizar versão, parâmetros e formatos de exportação |
| Documental | Identidade/horário do aprovador e digest não transcritos nos documentos | Manter links para os registros originais; evidências de aprovação, deploy e status Live já coletadas |

## 4. Cinco lições aprendidas

1. **Shift-left security é verificável:** a execução #23 demonstra que um controle no início da cadeia pode impedir que uma alteração prossiga até a publicação.
2. **Sucesso não é sinônimo de zero risco:** a #15 passou nos gates definidos, apesar de existirem achados de severidade menor e alertas informativos.
3. **É necessário interpretar severidades e formatos:** a diferença entre TXT e JSON do Trivy exige examinar a configuração e o escopo de cada relatório, não escolher o número mais conveniente.
4. **SAST, SCA e DAST são complementares:** Semgrep examina padrões no código, Trivy avalia dependências e imagem, e ZAP observa o comportamento HTTP da aplicação em execução.
5. **Governança também é segurança:** a aprovação humana antes do Render cria um ponto de decisão adicional, mas precisa de identidade, data e justificativa auditáveis.

## 5. Melhorias futuras propostas (não implementadas nesta evidência)

- Incluir `HEALTHCHECK` e comparar resultados do Trivy em uma execução posterior.
- Atualizar e fixar a imagem-base do Nginx por digest e documentar o digest publicado.
- Uniformizar a exportação de relatórios e preservar versões das ferramentas.
- Manter registro auditável da aprovação e documentar eventual correção posterior do teste negativo, se aplicável.
- Acrescentar testes funcionais automatizados para os fluxos mais importantes da aplicação.

## 6. Evidências

Consultar as capturas em [`evidencias/`](evidencias/) e os artifacts da [execução GitHub Actions](https://github.com/gabrielbeoni/critical-bait-devsecops/actions). As capturas incluem aprovação manual, deploy no Render, status Live e log de bloqueio do Gitleaks. O **Relatório Executivo V3** permanece como documento PDF separado e não foi alterado.
