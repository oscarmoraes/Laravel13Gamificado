window.COURSE_DATABASE = {
  "course": {
    "title": "Trilha Laravel 13 Completa — Dashboard de Livros",
    "subtitle": "Funil Gamificado de Aprendizado Interativo SENAI Dev",
    "totalLessons": 18,
    "totalXp": 2200,
    "playlistUrl": "https://www.youtube.com/playlist?list=PLcoYAcR89n-pe2M3ng7goeHTMwQNiUxXG"
  },
  "ranks": [
    {
      "level": 1,
      "minXp": 0,
      "title": "Dev Laravel Iniciante",
      "badge": "🌱"
    },
    {
      "level": 2,
      "minXp": 500,
      "title": "Praticante de Rotas & Blade",
      "badge": "⚡"
    },
    {
      "level": 3,
      "minXp": 1000,
      "title": "Construtor MVC & Migrations",
      "badge": "🛠️"
    },
    {
      "level": 4,
      "minXp": 1600,
      "title": "Especialista em Eloquent & Relacionamentos",
      "badge": "🚀"
    },
    {
      "level": 5,
      "minXp": 2100,
      "title": "Mestre Laravel 13 SENAI",
      "badge": "👑"
    }
  ],
  "lessons": [
    {
      "id": 1,
      "index": 1,
      "title": "Introdução e Instalação do Laravel 13",
      "videoId": "cfJEfeJ0Mq0",
      "duration": "12:15",
      "category": "Fundamentos & Setup",
      "summary": "Visão geral do ecossistema Laravel 13, requisitos do ambiente (PHP 8+, Composer), instalação via instalador global ou create-project, estrutura de diretórios e o arquivo .env.",
      "competency": "Configuração inicial de projetos Laravel, compreensão do ciclo de inicialização e variáveis de ambiente.",
      "xp": 100,
      "badge": {
        "id": "l13_welcome",
        "name": "Primeiros Passos no Laravel 13",
        "icon": "🌱",
        "description": "Instalou e inicializou o ambiente Laravel com sucesso"
      },
      "question": {
        "text": "Qual comando da CLI Artisan é utilizado para iniciar o servidor de desenvolvimento embutido do Laravel localmente?",
        "options": [
          "php artisan run",
          "php artisan serve",
          "laravel start --port=8000",
          "composer start-dev"
        ],
        "correct": 1,
        "explanation": "O comando 'php artisan serve' inicia o servidor embutido do PHP configurado para direcionar todas as requisições para public/index.php, respondendo por padrão em http://127.0.0.1:8000."
      }
    },
    {
      "id": 2,
      "index": 2,
      "title": "Rotas Básicas e Retorno de Views",
      "videoId": "KlyQwcXojUk",
      "duration": "10:40",
      "category": "Roteamento",
      "summary": "Declaração de rotas HTTP em routes/web.php, o helper view(), passagem de variáveis do roteador para templates Blade e boas práticas de nomenclatura.",
      "competency": "Mapeamento de rotas HTTP e renderização de views com injeção de dados.",
      "xp": 110,
      "badge": {
        "id": "l13_routes",
        "name": "Explorador de Rotas",
        "icon": "🧭",
        "description": "Mapeou endpoints web e renderizou páginas dinâmicas"
      },
      "question": {
        "text": "Em 'routes/web.php', como passar a variável $livros para a view 'books.index' de forma idiomática?",
        "options": [
          "return view('books.index')->withData($livros);",
          "return view('books.index', ['books' => $livros]);",
          "return render('books.index', $livros);",
          "return Route::view('books.index', $livros);"
        ],
        "correct": 1,
        "explanation": "A função helper view('nome.da.view', $dados) aceita como segundo argumento um array associativo (ou compact()), tornando as chaves acessíveis como variáveis ($books) dentro do template Blade."
      }
    },
    {
      "id": 3,
      "index": 3,
      "title": "Rotas com Parâmetros Dinâmicos",
      "videoId": "TPfldLtSbYg",
      "duration": "11:25",
      "category": "Roteamento",
      "summary": "Criação de rotas com parâmetros na URL (/books/{id}), restrições com expressões regulares (where, whereNumber), e parâmetros opcionais ({categoria?}).",
      "competency": "Captura e validação segura de parâmetros dinâmicos na URL.",
      "xp": 110,
      "badge": {
        "id": "l13_route_params",
        "name": "Mestre de Parâmetros",
        "icon": "⚡",
        "description": "Definiu rotas flexíveis com validação de parâmetros"
      },
      "question": {
        "text": "Como garantir no Laravel que o parâmetro {id} na rota '/books/{id}' aceite estritamente dígitos numéricos?",
        "options": [
          "Route::get('/books/{id}', ...)->whereNumber('id');",
          "Route::get('/books/{id:int}', ...);",
          "Route::get('/books/{id}', ...)->validateNumeric();",
          "Route::get('/books/{id}', ...)->onlyDigits();"
        ],
        "correct": 0,
        "explanation": "O método encadeado ->whereNumber('id') instrui o roteador do Laravel a aceitar apenas caracteres numéricos [0-9] para aquele segmento, retornando 404 automaticamente se o cliente fornecer caracteres alfabéticos."
      }
    },
    {
      "id": 4,
      "index": 4,
      "title": "Motor de Templates Blade",
      "videoId": "MbOz3xTk2FU",
      "duration": "14:10",
      "category": "Templates & Blade",
      "summary": "Fundamentos do Blade: interpolação segura {{ $var }}, diretivas condicionais @if, @else, @elseif, laços @foreach, e tratamento elegante de listas vazias com @forelse.",
      "competency": "Construção de interfaces limpas e dinâmicas utilizando diretivas nativas do Blade.",
      "xp": 120,
      "badge": {
        "id": "l13_blade_intro",
        "name": "Iniciado no Blade",
        "icon": "🗡️",
        "description": "Dominou as diretivas e estruturas de repetição do Blade"
      },
      "question": {
        "text": "Qual diretiva do Blade permite iterar sobre um array de livros e ao mesmo tempo renderizar uma mensagem de fallback caso a lista esteja vazia?",
        "options": [
          "@loop ... @fallback ... @endloop",
          "@foreach ... @empty ... @endforeach",
          "@forelse ... @empty ... @endforelse",
          "@while ... @default ... @endwhile"
        ],
        "correct": 2,
        "explanation": "A diretiva '@forelse($books as $book) ... @empty ... @endforelse' é o padrão idiomático do Blade para iterar coleções e definir a exibição em caso de lista vazia sem precisar de um @if extra."
      }
    },
    {
      "id": 5,
      "index": 5,
      "title": "Layouts Mestres e Slots no Blade",
      "videoId": "2-x3QPnfWMs",
      "duration": "13:30",
      "category": "Templates & Blade",
      "summary": "Criação de templates mestres reutilizáveis, arquitetura baseada em componentes (<x-layout>), o slot padrão {{ $slot }} e slots nomeados (<x-slot:title>).",
      "competency": "Modularização de layout de aplicação utilizando a abordagem moderna de componentes Blade.",
      "xp": 120,
      "badge": {
        "id": "l13_layouts",
        "name": "Arquiteto de Layouts",
        "icon": "📐",
        "description": "Estruturou layouts mestres robustos com slots e componentes"
      },
      "question": {
        "text": "Ao utilizar componentes anônimos de layout (<x-layout>), onde o conteúdo interno inserido entre as tags do componente é injetado no arquivo do layout?",
        "options": [
          "Na variável especial {{ $slot }}",
          "Na diretiva @yield('content')",
          "No marcador {{ $body }}",
          "Na tag especial <component-body/>"
        ],
        "correct": 0,
        "explanation": "Em componentes Blade (<x-layout>), todo o conteúdo declarado entre as tags de abertura e fechamento é injetado na variável padrão {{ $slot }} do componente de layout."
      }
    },
    {
      "id": 6,
      "index": 6,
      "title": "Componentes Blade, Atributos e Props",
      "videoId": "UJokfqGNmjA",
      "duration": "15:20",
      "category": "Templates & Blade",
      "summary": "Criação de componentes reutilizáveis para cards de livros, botões e badges. Utilização da diretiva @props(['active' => false]), mesclagem de classes CSS com $attributes->merge().",
      "competency": "Criação de componentes UI granulares, flexíveis e altamente reaproveitáveis.",
      "xp": 120,
      "badge": {
        "id": "l13_components",
        "name": "Designer de Componentes",
        "icon": "🧩",
        "description": "Construiu componentes Blade reutilizáveis com props e attributes"
      },
      "question": {
        "text": "No topo de um componente Blade (ex: book-card.blade.php), qual diretiva deve ser usada para declarar valores padrão e receber propriedades?",
        "options": [
          "@parameters(['title' => ''])",
          "@props(['title' => '', 'available' => true])",
          "@input(['title', 'available'])",
          "@args(['title', 'available'])"
        ],
        "correct": 1,
        "explanation": "A diretiva '@props([...])' no início do arquivo do componente define as propriedades esperadas e seus valores padrão, separando-as dos atributos HTML comuns que vão para a bolsa $attributes."
      }
    },
    {
      "id": 7,
      "index": 7,
      "title": "Estilização e Integração de CSS com Vite",
      "videoId": "WhKngGuuV4M",
      "duration": "12:50",
      "category": "Frontend & Assets",
      "summary": "Configuração do bundler Vite em projetos Laravel, diretiva @vite(['resources/css/app.css', 'resources/js/app.js']), integração com Tailwind CSS e compilação de assets em tempo real.",
      "competency": "Gerenciamento e compilação de ativos de frontend com o Vite no Laravel.",
      "xp": 110,
      "badge": {
        "id": "l13_vite_css",
        "name": "Estilista Full-Stack",
        "icon": "🎨",
        "description": "Integrou Vite e estilização moderna de CSS no projeto"
      },
      "question": {
        "text": "Qual diretiva do Blade é incluída no <head> da aplicação para que o Vite carregue as folhas de estilo e scripts em desenvolvimento e produção?",
        "options": [
          "@vite(['resources/css/app.css', 'resources/js/app.js'])",
          "@mix('app.css', 'app.js')",
          "@assets(['app.css', 'app.js'])",
          "<vite-script src='app.js' />"
        ],
        "correct": 0,
        "explanation": "A diretiva '@vite([...])' insere as tags <link> e <script> apontando para o servidor de desenvolvimento do Vite (com Hot Module Replacement) ou para os bundles minificados na pasta public/build em produção."
      }
    },
    {
      "id": 8,
      "index": 8,
      "title": "Migrações de Banco de Dados (Migrations)",
      "videoId": "a8dG6HOG-Ak",
      "duration": "16:40",
      "category": "Banco de Dados",
      "summary": "Criação de migrations com artisan make:migration create_books_table, definição de colunas no Schema Builder ($table->string, $table->text, $table->decimal), execução de migrações e rollback.",
      "competency": "Modelagem versionada de tabelas no banco de dados através de Migrations.",
      "xp": 130,
      "badge": {
        "id": "l13_migrations",
        "name": "Engenheiro de Schema",
        "icon": "🗄️",
        "description": "Versionou tabelas e estruturas relacionais com Migrations"
      },
      "question": {
        "text": "Qual comando Artisan é executado para aplicar todas as migrações pendentes no banco de dados configurado no .env?",
        "options": [
          "php artisan db:run",
          "php artisan migrate",
          "php artisan schema:update",
          "php artisan database:create"
        ],
        "correct": 1,
        "explanation": "'php artisan migrate' inspeciona a tabela 'migrations' e aplica todas as classes de migração pendentes em database/migrations, executando seus métodos up()."
      }
    },
    {
      "id": 9,
      "index": 9,
      "title": "Modelos Eloquent e Mapeamento ORM - Parte 1",
      "videoId": "kXuNRKMiXRU",
      "duration": "15:05",
      "category": "Eloquent ORM",
      "summary": "Criação de models com php artisan make:model Book, convenções do Eloquent (nome de tabela no plural 'books', chave primária 'id'), atributos $fillable e proteção contra Mass Assignment.",
      "competency": "Criação e configuração de Models Eloquent com controle seguro de atributos preenchíveis.",
      "xp": 130,
      "badge": {
        "id": "l13_eloquent_1",
        "name": "Desbravador do Eloquent",
        "icon": "📖",
        "description": "Criou modelos declarativos e configurou proteção de atributos"
      },
      "question": {
        "text": "Por que a propriedade 'protected $fillable = [...]' é declarada dentro de uma classe Model do Eloquent?",
        "options": [
          "Para definir quais campos são obrigatórios no formulário HTML.",
          "Para listar explicitamente quais colunas podem ser atribuídas em massa (Mass Assignment) de forma segura.",
          "Para acelerar as consultas SELECT com índices automáticos.",
          "Para impedir que a tabela receba registros deletados."
        ],
        "correct": 1,
        "explanation": "'$fillable' é uma lista branca de atributos que podem ser atribuídos em massa (ex: Book::create($request->all())). Isso impede que usuários maliciosos injetem campos sensíveis como 'is_admin'."
      }
    },
    {
      "id": 10,
      "index": 10,
      "title": "Modelos Eloquent e Consultas - Parte 2",
      "videoId": "HCpofOAiElE",
      "duration": "14:55",
      "category": "Eloquent ORM",
      "summary": "Consultas fluentes com o Query Builder do Eloquent: Book::all(), find(), findOrFail(), cláusulas where(), ordenação orderBy(), limit e métodos de contagem.",
      "competency": "Execução de consultas fluentes e recuperação eficiente de registros com o ORM.",
      "xp": 130,
      "badge": {
        "id": "l13_eloquent_2",
        "name": "Especialista em Consultas",
        "icon": "🔍",
        "description": "Executou buscas refinadas e tratamento seguro com findOrFail"
      },
      "question": {
        "text": "Qual método do Eloquent busca um registro pela chave primária e lança uma exceção ModelNotFoundException (resultando em erro HTTP 404) caso o ID não exista?",
        "options": [
          "Book::getOrDie($id);",
          "Book::findOrFail($id);",
          "Book::findOr404($id);",
          "Book::firstOrFail($id);"
        ],
        "correct": 1,
        "explanation": "'Book::findOrFail($id)' busca o registro e, se não encontrar, gera automaticamente uma resposta 404 para o cliente, simplificando o fluxo do controlador."
      }
    },
    {
      "id": 11,
      "index": 11,
      "title": "Arquitetura MVC e Controllers",
      "videoId": "hcRRRXfh5hs",
      "duration": "16:20",
      "category": "Arquitetura MVC",
      "summary": "Papel dos Controllers na arquitetura MVC, comando make:controller BookController --resource, métodos padrão (index, create, store, show, edit, update, destroy) e injeção de dependência.",
      "competency": "Estruturação de controladores RESTful e aplicação da separação de responsabilidades do MVC.",
      "xp": 140,
      "badge": {
        "id": "l13_mvc",
        "name": "Comandante do MVC",
        "icon": "🏛️",
        "description": "Desacoplou regras de negócio em Resource Controllers"
      },
      "question": {
        "text": "Qual flag do comando 'php artisan make:controller BookController' cria o controlador já preenchido com todos os 7 métodos clássicos de operações CRUD?",
        "options": [
          "--crud",
          "--resource",
          "--restful",
          "--api-all"
        ],
        "correct": 1,
        "explanation": "A opção '--resource' instrui o gerador Artisan a criar o controlador com os métodos canônicos: index, create, store, show, edit, update e destroy, permitindo registrá-lo com Route::resource('books', BookController::class)."
      }
    },
    {
      "id": 12,
      "index": 12,
      "title": "Paginação de Resultados de Livros",
      "videoId": "KygWCLZes50",
      "duration": "11:45",
      "category": "Eloquent ORM",
      "summary": "Implementação de paginação nativa com Book::paginate(10) ou simplePaginate(), renderização automática dos links de navegação com {{ $books->links() }} e personalização com Tailwind.",
      "competency": "Construção de listas paginadas de alta performance no banco de dados.",
      "xp": 120,
      "badge": {
        "id": "l13_pagination",
        "name": "Navegador de Páginas",
        "icon": "📑",
        "description": "Implementou paginação otimizada de dados no catálogo de livros"
      },
      "question": {
        "text": "No template Blade, como renderizar os botões e links de navegação entre as páginas geradas pelo método paginate()?",
        "options": [
          "{{ $books->renderNav() }}",
          "{{ $books->links() }}",
          "{{ pagination($books) }}",
          "{{ $books->buttons() }}"
        ],
        "correct": 1,
        "explanation": "O método '{{ $books->links() }}' renderiza os links HTML de paginação (Anterior, Próxima e numeração), com suporte nativo ao Tailwind CSS no Laravel."
      }
    },
    {
      "id": 13,
      "index": 13,
      "title": "Relacionamento 1:N (Um para Muitos)",
      "videoId": "2GfvNYt1suQ",
      "duration": "17:10",
      "category": "Relacionamentos ORM",
      "summary": "Modelagem de relacionamentos entre Autores/Categorias e Livros. Chave estrangeira no banco, métodos hasMany() e belongsTo() nos models, e carregamento ansioso (Eager Loading) com with().",
      "competency": "Definição de relacionamentos relacionais e mitigação do problema de consulta N+1.",
      "xp": 140,
      "badge": {
        "id": "l13_relationships",
        "name": "Conector Relacional",
        "icon": "🔗",
        "description": "Modelou relacionamentos 1:N com integridade e eager loading"
      },
      "question": {
        "text": "Se uma Categoria possui muitos Livros, qual método deve ser retornado no Model Category para definir este vínculo?",
        "options": [
          "return $this->hasOne(Book::class);",
          "return $this->hasMany(Book::class);",
          "return $this->belongsTo(Book::class);",
          "return $this->manyToMany(Book::class);"
        ],
        "correct": 1,
        "explanation": "No modelo pai (Category), a relação 1:N é representada por '$this->hasMany(Book::class)'. No modelo filho (Book), a relação inversa correspondente é '$this->belongsTo(Category::class)'."
      }
    },
    {
      "id": 14,
      "index": 14,
      "title": "Criação de Formulários e Métodos HTTP",
      "videoId": "7A0JjfNj3rY",
      "duration": "13:50",
      "category": "Formulários & HTTP",
      "summary": "Criação do formulário de cadastro de livros (books.create), ação para a rota POST /books, proteção contra ataques CSRF com a diretiva @csrf e campos HTML estilizados.",
      "competency": "Construção de formulários web seguros com tokens de validação CSRF.",
      "xp": 120,
      "badge": {
        "id": "l13_forms",
        "name": "Guardião de Formulários",
        "icon": "🛡️",
        "description": "Construiu formulários de cadastro protegidos contra CSRF"
      },
      "question": {
        "text": "Qual diretiva do Blade DEVE ser obrigatoriamente incluída em qualquer formulário POST no Laravel para evitar o erro HTTP 419 (Page Expired)?",
        "options": [
          "@token",
          "@csrf",
          "@security",
          "@verify"
        ],
        "correct": 1,
        "explanation": "A diretiva '@csrf' gera um input oculto (<input type='hidden' name='_token' value='...'>) contendo o token de proteção CSRF validado pelo middleware VerifyCsrfToken."
      }
    },
    {
      "id": 15,
      "index": 15,
      "title": "Validação de Dados de Formulário e Persistência",
      "videoId": "8bP6st5hR8w",
      "duration": "16:30",
      "category": "Validação & Persistência",
      "summary": "Validação de entradas no Controller com $request->validate(), regras de validação (required, min, max, numeric), recuperação do valor antigo com old() e exibição de mensagens de erro com @error.",
      "competency": "Validação robusta de dados no servidor e persistência segura no banco de dados.",
      "xp": 140,
      "badge": {
        "id": "l13_validation",
        "name": "Validador Rigoroso",
        "icon": "✅",
        "description": "Validou dados de entrada e manipulou erros com old e @error"
      },
      "question": {
        "text": "Se a validação falhar em '$request->validate([...])', o que o Laravel faz automaticamente por padrão em requisições de formulário web?",
        "options": [
          "Lança uma página de erro 500 informando que o banco de dados falhou.",
          "Redireciona o usuário de volta para a página anterior, preservando os dados preenchidos (old) e disponibilizando a bolsa de erros $errors.",
          "Limpa todos os dados digitados e envia um e-mail para o administrador.",
          "Salva os dados incorretos com uma flag de rascunho."
        ],
        "correct": 1,
        "explanation": "O validador redireciona automaticamente de volta com os dados digitados (flash input) e os erros de validação vinculados à sessão, permitindo exibir mensagens amigáveis via @error e manter valores com old()."
      }
    },
    {
      "id": 16,
      "index": 16,
      "title": "Upload de Arquivos e Capas de Livros",
      "videoId": "GjoquXSSM9A",
      "duration": "15:40",
      "category": "Uploads & Armazenamento",
      "summary": "Configuração do atributo enctype='multipart/form-data', validação de arquivos de imagem (image, mimes, max), upload via $request->file('cover')->store('covers', 'public') e o link simbólico storage:link.",
      "competency": "Manipulação, armazenamento e exibição pública de arquivos e imagens enviadas por upload.",
      "xp": 140,
      "badge": {
        "id": "l13_file_upload",
        "name": "Gerenciador de Mídia",
        "icon": "🖼️",
        "description": "Implementou upload e armazenamento seguro de capas de livros"
      },
      "question": {
        "text": "Qual comando Artisan deve ser executado para criar o link simbólico que permite acessar publicamente arquivos salvos no disco 'public' (storage/app/public)?",
        "options": [
          "php artisan storage:link",
          "php artisan files:publish",
          "php artisan media:sync",
          "php artisan upload:allow"
        ],
        "correct": 0,
        "explanation": "'php artisan storage:link' cria o atalho público 'public/storage' apontando para 'storage/app/public', tornando as imagens carregadas diretamente acessíveis via URLs no navegador (asset('storage/...')). "
      }
    },
    {
      "id": 17,
      "index": 17,
      "title": "Formulário de Edição e Atualização (Update)",
      "videoId": "e4YHgSagduE",
      "duration": "14:15",
      "category": "CRUD & Edição",
      "summary": "Criação da view de edição (books.edit), method spoofing com a diretiva @method('PUT'), preenchimento com old('title', $book->title), e atualização com $book->update().",
      "competency": "Construção de fluxos completos de alteração de registros no CRUD.",
      "xp": 130,
      "badge": {
        "id": "l13_update",
        "name": "Mestre da Atualização",
        "icon": "✏️",
        "description": "Construiu formulários de edição com method spoofing e update"
      },
      "question": {
        "text": "Como o HTML puro só suporta métodos GET e POST em formulários, qual diretiva do Blade é utilizada para simular uma requisição HTTP PUT no Laravel?",
        "options": [
          "@http('PUT')",
          "@method('PUT')",
          "@action('UPDATE')",
          "@verb('PUT')"
        ],
        "correct": 1,
        "explanation": "A diretiva '@method(\"PUT\")' cria um campo oculto (<input type='hidden' name='_method' value='PUT'>) que o roteador do Laravel interpreta como uma requisição HTTP PUT autêntica."
      }
    },
    {
      "id": 18,
      "index": 18,
      "title": "Exclusão de Registros e Toques Finais",
      "videoId": "npz7RCYHwB4",
      "duration": "15:10",
      "category": "CRUD & Finalização",
      "summary": "Implementação da exclusão segura com @method('DELETE') e $book->delete(), remoção de arquivo de imagem antigo associado, mensagens flash com session()->flash('success') e conclusão do projeto.",
      "competency": "Finalização do CRUD com remoção segura de dados, limpeza de arquivos órfãos e feedback de sucesso.",
      "xp": 150,
      "badge": {
        "id": "l13_champion",
        "name": "Mestre do Dashboard Laravel",
        "icon": "🏆",
        "description": "Completou todas as 18 aulas da biblioteca de livros em Laravel 13"
      },
      "question": {
        "text": "Após deletar um livro com sucesso no método destroy(), qual método da Facade Session (ou helper session()) armazena uma mensagem temporária para a próxima requisição?",
        "options": [
          "session()->flash('success', 'Livro excluído com sucesso!');",
          "session()->setTemp('success', 'Livro excluído!');",
          "session()->alert('success', 'Livro excluído!');",
          "session()->putOnce('success', 'Livro excluído!');"
        ],
        "correct": 0,
        "explanation": "'session()->flash(chave, mensagem)' armazena o dado na sessão exclusivamente para a próxima requisição HTTP, perfeito para exibir alertas de feedback após um redirect."
      }
    }
  ]
};
