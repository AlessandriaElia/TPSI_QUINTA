

CREATE TABLE IF NOT EXISTS dischi (
  id int NOT NULL AUTO_INCREMENT,
  autore varchar(32) DEFAULT NULL,
  titolo varchar(32) DEFAULT NULL,
  prezzo double DEFAULT NULL,
  anno int DEFAULT NULL,
  genere varchar(32) DEFAULT NULL,
  PRIMARY KEY (id)
);

INSERT INTO dischi (autore, titolo, prezzo, anno, genere) VALUES
('vasco rossi', 'albachiara', '11.3', '1985', 'rock' ),
('zucchero', 'blues', '12.3', '1988', 'blues' ),
('stadio', 'un giorno mi dirai', '13.3', '2016', 'pop' ),
('battiato', 'la voce del padrone', '14.3', '1982', 'pop' ),
('elio e le storie tese', 'la terra dei cachi', '14.3', '1994', 'pop' ),
('spingsteen', 'the river', '16.3', '1979', 'rock' ),
('pink floyd', 'the wall', '17.3', '1980', 'rock' ),
('battiato', 'patriots', '13', '1979', 'pop' ),
('gigi d\'alessio', 'non dirgli mai', '13', '1999', 'pop' );

