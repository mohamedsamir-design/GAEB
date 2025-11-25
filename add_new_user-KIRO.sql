INSERT INTO [dbo].[UTENTI] (
    [LOGIN],
    [PASSWORD],
    [SALT],
    [ULTIMO_ACCESSO],
    [ULTIMO_CAMBIO_PASSWORD],
    [ATTIVO],
    [NOME_UTENTE],
    [DESCRIZIONE],
    [E_MAIL],
    [NUMERO_TELEFONICO],
    [DATA_CREAZIONE]
)
VALUES (
    'mariamshindy123',                         
    'gItLb5eYgVIA7VUaRdlhQLdv4NgzOqaBEOO+wPEqPYTVPsvqu5acTsS6kfaesIrrSrv401noQONNlgbYjNo4PQ==',                       
    '1234',                       
    NULL,                                
    NULL,                                
    1,                                   
    'Mariam TestUser',                   
    'Test account for login',            
    'mariamshindy@example.com',             
    '+123456789',                        
    GETDATE()                            
);


select * from UTENTI
where LOGIN = 'mariamshindy123'


SELECT * FROM PROFILO;

INSERT INTO UTENTE_PROFILO (LOGIN, ID_PROFILO)
VALUES ('mariamshindy123', 1);


INSERT INTO UTENTI_ATTRIBUTES (
    LOGIN,
    FLG_COM,
    ID_CLI_COM,
    FLG_SMART_UPLOAD
)
VALUES (
    'mariamshindy123',  
    1,            
    1,           
    1              
);
Update  UTENTI_ATTRIBUTES
set ID_CLI_COM = 1
where LOGIN = 'mariamshindy123'
