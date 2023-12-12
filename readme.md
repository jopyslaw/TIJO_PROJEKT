# Kurs

## Testowanie i Jakość Oprogramowania / Projekt

# Autor

## Maciej Pichla , Konrad Jop 34290

# Temat projektu

## Aplikacja do planowania wydarzeń

# Opis projektu

"Aplikacja do planowania wydarzeń" to aplikacja która pozwala na
planowanie naszego dnia poprzez możliwość zapisu odpowiednich wydarzeń
na które będziemy uczęszczać. Aplikacja pozwala również na edytowanie
lub usunięcie takich zdarzeń. Ma również możliwość tworzenia kont przez co
może z niej korzystać wielu użytkowników. Dane zapisywane są w bazie danych
dlatego są one dostępne na każdym urządzeniu z dostępem do interentu.

## Uruchomienie projektu

Należy w pliku config.js dodać w miejsce databaseUrl link do bazy mongoDB.

## Uruchomienie testów jednostkowych

Należy przejść do folderu Frontend i wpisać komendę npm run test

## Uruchomienie testów integracyjnych

Należy przejść do folderu Backend i wpisać komendę npm run test

## Scenariusze testowe dla testera manualnego

| Test Case ID | Opis                                                            | Kroki Testowe                                                                                                                                                                                                                         | Oczekiwany Wynik                                                                                              |
| ------------ | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| TC-01        | Rejstracja nowego użytkownika z poprawnymi danymi               | Wciśnij przycisk 'Zarejstruj się', wypełnij w formularzu wszystkie pola, wciśnij przycisk "Zarejestruj się" usuwania                                                                                                                  | Nastąpi przekierowanie na stronę logowania                                                                    |
| TC-02        | Rejstracja nowego użytkownika z użytym już mailem w rejstracji  | Wciśnij przycisk 'Zarejstruj się', wypełnij w formularzu wszystkie pola, w polu email podaj wcześniej użyty email                                                                                                                     | Serwer zwróci bład co uniemożliwi utworzenie konta z uzupełnionymi danymi                                     |
| TC-03        | Rejstracja nowego użytkownika z błednie wypełnionym polem hasło | Wciśnij przycisk 'Zarejstruj się', wypełnij w formularzu wszystkie pola, w polu hasła wpisz hasło krótsze niż 8 znaków i bez dużej litery                                                                                             | Pod polem wyświetla się informacja ,ze podane hasło nie spełnia wymagań systemu                               |
| TC-04        | Logowanie użytkownika                                           | Po przejsciu na strone logowania użytkownik wpisuje hasło oraz nazwę uzytkownika podaną przy rejstracji                                                                                                                               | Nastąpi przekierowanie na stronę z kalendarzem                                                                |
| TC-05        | Przeglądanie wcześniej dodanych wydarzeń przez użytkownika      | Zaloguj się                                                                                                                                                                                                                           | Na stronie pokażą się wszystkie wydarzenie dodane przez użytkownika                                           |
| TC-06        | Dodanie nowego zdarzenia                                        | Zaloguj się, wciśnij i przeciągnij kursor myszy po kalendarzu, wyświetli się modal, uzupełnij formularz danymi, naciśnij przycisk "Save"                                                                                              | W kalendarzu pojawia sie nowo dodane wydarzenie                                                               |
| TC-07        | Edytowanie zdarzenia przez użytkownika                          | Zaloguj się, wciśnij na wydarzenie które ma zostać zedytowane, nastąpi przeniesinie do podstrony z szczegółami, wciśnij przycisk "Edit", wyświetli się modal z już wypełnionymi danymi, zmień wartość danych, wciśnij przycisk "Save" | Na ekranie szczegółów wydarzenia pojawią się poprawione wydarzenie                                            |
| TC-08        | Usunięcie wydarzenia                                            | Zaloguj się, wciśnij na wydarzenie które ma zostać usunięte, nastąpi przeniesinie do podstrony z szczegółami, wciśnij przycisk "Remove"                                                                                               | Nastąpi przekierowanie na podstronę z kalendarzem, które nie będzie zawierało wcześniej usuniętego wydarzenia |
| TC-09        | Nieautoryzowany dostęp do podstrony z kalendarzem               | Nie będąc zalgowanym użytkownikiem wklej URL do podstrony z kalendarzem                                                                                                                                                               | Nastąpi przekierowanie na stronę główną aplikacji                                                             |
| TC-10        | Wylogowanie z systemu                                           | Wciśnij przycisk "Wyloguj się"                                                                                                                                                                                                        | Nastąpi przekierowanie na stronę główną                                                                       |

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
