# Kurs

## Testowanie i Jakość Oprogramowania / Projekt

# Autor

## Maciej Pichla 34317, Konrad Jop 34290

# Temat projektu

## Aplikacja do planowania wydarzeń

# Opis projektu

"Aplikacja do planowania wydarzeń" to aplikacja która pozwala na
planowanie naszego dnia poprzez możliwość zapisu odpowiednich wydarzeń
na które będziemy uczęszczać. Aplikacja pozwala również na edytowanie
lub usunięcie takich wydarzeń. Ma również możliwość tworzenia kont przez co
może z niej korzystać wielu użytkowników. Dane zapisywane są w bazie danych
dlatego są one dostępne na każdym urządzeniu z dostępem do internetu.

## Uruchomienie projektu

Należy w folderze Backend w pliku config.js dodać w miejsce databaseUrl link do bazy mongoDB.

Aby uruchomić serwer należy przejść do folderu Backend i wywołać komendę npm run start

Aby uruchmomić aplikację frontendową należy przejść do folderu Frontend i wywołać komendę npm start

## Uruchomienie testów jednostkowych

Należy przejść do folderu Frontend i wpisać komendę npm run test

## Uruchomienie testów integracyjnych

Należy przejść do folderu Backend i wpisać komendę npm run test

## Scenariusze testowe dla testera manualnego

| Test Case ID | Opis                                                            | Kroki Testowe                                                                                                                                                                                                                              | Oczekiwany Wynik                                                                                              |
| ------------ | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| TC-01        | Rejestracja nowego użytkownika z poprawnymi danymi              | Wciśnij przycisk 'Zarejestruj się', wypełnij w formularzu wszystkie pola, wciśnij przycisk "Zarejestruj się"                                                                                                                               | Nastąpi przekierowanie na stronę logowania                                                                    |
| TC-02        | Rejestracja nowego użytkownika z użytym już mailem              | Wciśnij przycisk 'Zarejestruj się', wypełnij w formularzu wszystkie pola, w polu email podaj wcześniej użyty email                                                                                                                         | Serwer zwróci błąd co uniemożliwi utworzenie konta                                                            |
| TC-03        | Rejetracja nowego użytkownika z błędnie wypełnionym polem hasło | Wciśnij przycisk 'Zarejestruj się', wypełnij w formularzu wszystkie pola, w polu hasło wpisz hasło krótsze niż 8 znaków i bez dużej litery                                                                                                 | Pod polem wyświetla się informacja ,że podane hasło nie spełnia wymagań systemu                               |
| TC-04        | Logowanie użytkownika                                           | Po przejsciu na stronę logowania użytkownik wpisuje hasło oraz nazwę użytkownika podaną przy rejestracji                                                                                                                                   | Nastąpi przekierowanie na stronę z kalendarzem                                                                |
| TC-05        | Przeglądanie wcześniej dodanych wydarzeń przez użytkownika      | Zaloguj się                                                                                                                                                                                                                                | Na stronie pokażą się wszystkie wydarzenie dodane przez użytkownika                                           |
| TC-06        | Dodanie nowego zdarzenia                                        | Zaloguj się, wciśnij i przeciągnij kursor myszy po kalendarzu, wyświetli się modal, uzupełnij formularz danymi, naciśnij przycisk "Zapisz"                                                                                                 | W kalendarzu pojawia sie nowo dodane wydarzenie                                                               |
| TC-07        | Edytowanie zdarzenia przez użytkownika                          | Zaloguj się, wciśnij na wydarzenie które ma zostać zedytowane, nastąpi przeniesinie do podstrony ze szczegółami, wciśnij przycisk "Edytuj", wyświetli się modal z już wypełnionymi danymi, zmień wartość danych, wciśnij przycisk "Zapisz" | Na ekranie szczegółów wydarzenia pojawią się poprawione dane                                                  |
| TC-08        | Usunięcie wydarzenia                                            | Zaloguj się, wciśnij na wydarzenie które ma zostać usunięte, nastąpi przeniesinie do podstrony ze szczegółami, wciśnij przycisk "Usuń"                                                                                                     | Nastąpi przekierowanie na podstronę z kalendarzem, które nie będzie zawierało wcześniej usuniętego wydarzenia |
| TC-09        | Nieautoryzowany dostęp do podstrony z kalendarzem               | Nie będąc zalgowanym użytkownikiem wklej URL do podstrony z kalendarzem                                                                                                                                                                    | Nastąpi przekierowanie na stronę główną aplikacji                                                             |
| TC-10        | Wylogowanie z systemu                                           | Wciśnij przycisk "Wyloguj się"                                                                                                                                                                                                             | Nastąpi przekierowanie na stronę główną                                                                       |

## Technologie użyte w projekcie

- Angular
- Node.JS
- MongoDB
- Express.js
- Angular Material
- SCSS
- Jest
- Karma
- Jasmine
