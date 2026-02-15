# Resident Live Chat

## Cum functioneaza
### Backend
    Aplicatie Node.js cu Express si Socket.io.
    Asculta pe portul 3000, primeste mesaje de la client prin Socket.io, construieste obiectul ChatMessage si il trimite tuturor clientilor
    CORS configurat pentru a permite comunicarea cu frontend-ul (de pe port 4200)

    Structura ChatMessage:
    id: string;
    username: string;
    text: string;
    sentAt: string; // ISO String

    Comenzi de instalare si rulare: 
    cd server   -> se intra in folderul de backend (server) 
    npm install -> se instaleaza dependintele necesare (din package.json)
    npm start   -> se porneste serverul de backend (port:3000)

### Frontend
    Aplicatie Angular.
    Ruleaza pe portul 4200.
    In ruta /chat se ofera in josul paginii un form custom (prin libraria NG-ZORRO) cu doua campuri obligatorii: username si mesaj + un buton de trimitere
    In partea superioara a paginii se afiseaza mesajele trimise de catre utilizatori + timestamp

    Comenzi de instalare si rulare:
    cd client   -> se intra in folderul de frontend (client)
    npm install -> se instaleaza dependintele necesare (din package.json)
    npm start   -> se porneste serverul de frontend (port:4200 pentru Angular)

## flux gandit:
    ### client -mesaj> socket.io -mesaj> backend
    ### backend creeaza un obiect din mesajul primit de catre client cu datele socketului si mesajul
    ### backend trimite obiectul catre client
    ### clientul afiseaza mesajul si alte informatii relevante preluate din obiectul trimis de backend 