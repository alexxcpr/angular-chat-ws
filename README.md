# angular-chat-ws

## flux gandit:
    ### client -mesaj> socket.io -mesaj> backend
    ### backend creeaza un obiect din mesajul primit de catre client cu datele socketului si mesajul
    ### backend trimite obiectul catre client
    ### clientul afiseaza mesajul si alte informatii relevante preluate din obiectul trimis de backend 