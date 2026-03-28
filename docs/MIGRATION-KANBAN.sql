-- 1. Atualizar registros existentes para os novos padrões de status
-- (Mapeamento aproximado baseado na estrutura anterior)

UPDATE leads SET status = 'new' WHERE status = 'novo';
UPDATE leads SET status = 'contacting' WHERE status = 'contatado';
UPDATE leads SET status = 'closed' WHERE status = 'convertido';
UPDATE leads SET status = 'invalid' WHERE status = 'perdido';

-- 2. (Opcional) Adicionar restrição para garantir integridade dos dados
-- Se você quiser forçar apenas estes 5 valores:

/* 
ALTER TABLE leads 
ADD CONSTRAINT check_status 
CHECK (status IN ('new', 'contacting', 'no_response', 'closed', 'invalid'));
*/

-- 3. Garantir que o campo status tenha um valor padrão correto
ALTER TABLE leads ALTER COLUMN status SET DEFAULT 'new';
